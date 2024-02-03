import asyncWrapper from "../utils/asyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import ApiResonse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

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
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    );
    res.status(200).json(
        new ApiResonse(201, createdUser, "User created Successfully")
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

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
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
        .cookie("access token", accessToken)
        .cookie("refresh token", refreshToken)
        .json(
            new ApiResonse(200, loggedInUser, "User loggind in Successfully")
        );
});

const logoutUser = () => {};

const changePassword = () => {};

const refreshAccessToken = () => {};

const getUser = () => {};

const getAllUsers = () => {};

const deleteUserAccount = () => {};

const getSongsHistory = () => {};

export {
    registerUser,
    deleteUserAccount,
    loginUser,
    logoutUser,
    changePassword,
    getAllUsers,
    getUser,
    getSongsHistory,
    refreshAccessToken,
};
