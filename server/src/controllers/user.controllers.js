import asyncWrapper from "../utils/asyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import ApiResonse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = User.findById(userId);
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

    res.status(200).json(
        new ApiResonse(201, newUser, "User created Successfully")
    );
});

const loginUser = asyncWrapper(async (req, res) => {});

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
