import asyncWrapper from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResonse from "../utils/ApiResponse.js";

export const verifyJWT = asyncWrapper(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorised request");
    }

    const decodedToken = jwt.verify(token.process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
    );
    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
});
