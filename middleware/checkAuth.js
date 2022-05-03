import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.instaToken;
        if (!token) return res.status(401).json("Unauthorized!")

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id)

        req.user = user
        next()

    } catch (err) {
        return res.status(401).json("Unauthorized!")
    }
}