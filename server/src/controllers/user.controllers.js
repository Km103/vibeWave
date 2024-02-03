import asyncWrapper from "../utils/asyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import ApiResonse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const registerUser = asyncWrapper(async (req, res) => {
    const [firstName, lastName, email, password] = req.body;

    if (
        [firstName, lastName, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email: email });

    if (existedUser) {
        throw new ApiError(403, "User Alreasdy Exists");
    }

    const newUser = User.create(firstName, lastName, email, password);

    res.status(200).json(
        new ApiResonse(201, newUser, "User created Successfully")
    );
});

const loginUser = () => {};

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
