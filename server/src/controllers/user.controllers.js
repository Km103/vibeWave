import asyncWrapper from "../utils/asyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { Song } from "../models/song.models.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncWrapper(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if ([firstName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email: email });

    if (existedUser) {
        throw new ApiError(403, "User Alreasdy Exists");
    }

    const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    });

    if (!newUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user "
        );
    }
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken "
    );
    res.status(200).json(
        new ApiResponse(201, createdUser, "User created Successfully")
    );
});

const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!(password || email)) {
        throw new ApiError(400, "Username or password is required");
    }

    if (!user) {
        throw new ApiError(400, "User does not exist ");
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User loggind in Successfully")
        );
});

const logoutUser = asyncWrapper(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out "));
});

const refreshAccessToken = asyncWrapper(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, {}, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changePassword = asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    const validation = user.isPasswordCorrect(oldPassword);
    if (!validation) {
        throw new ApiError(401, "Invalid password");
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    user.password = newPassword;
    user.refreshToken = newRefreshToken;
    await user.save();
    const changedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(200)
        .cookie("accessToken", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(200, changedUser, "Password changed successfully")
        );
});

const getUser = asyncWrapper(async (req, res) => {
    const user = await User.findById(req.params.ID).select(
        "-password -refreshToken"
    );
    console.log();
    if (!user) {
        throw new ApiError(403, "User does not exist");
    }

    res.status(200).json(
        new ApiResponse(200, user, "user fetched successfully")
    );
});

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});

    res.status(200).json(
        new ApiResponse(200, users, "All users fetched Successfully")
    );
});

const deleteUserAccount = asyncWrapper(async (req, res) => {
    await User.deleteOne(req.body._id);

    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User deleted Successfully "));
});

const addRecentSong = asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken"
    );
    const song = req.body.songId;
    if (!song) {
        throw new ApiError(404, "Song not found");
    }
    user.recentSongs.push(song);
    await user.save({ validateBeforeSave: false });
    res.status(200).json(
        new ApiResponse(200, user, "Song added to recent songs successfully")
    );
});

const getRecentSongs = asyncWrapper(async (req, res) => {
    const recentSongs = await User.aggregate([
        {
            $match: {
                _id: req.user._id,
            },
        },
        {
            $lookup: {
                from: "songs",
                localField: "recentSongs",
                foreignField: "_id",
                as: "recentSongs",
            },
        },
        {
            $project: {
                _id: 1,
                recentSongs: 1,
            },
        },
    ]);

    res.status(200).json(
        new ApiResponse(200, recentSongs, "Recent songs fetched successfully")
    );
});

export {
    registerUser,
    deleteUserAccount,
    loginUser,
    logoutUser,
    changePassword,
    getAllUsers,
    getUser,
    refreshAccessToken,
    getRecentSongs,
    addRecentSong,
};
