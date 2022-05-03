import { User } from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}


class UsersController {

    signUp = async (req, res) => {
        try {
            const { email, username, password } = req.body

            const candidate = await User.findOne({ email })
            if (candidate) return res.status(400).json({ message: "This email already in use" })

            const hashPassword = await bcrypt.hash(password, 6)
            const user = await User.create({ email, username, password: hashPassword })

            const token = generateJwt(user._id)
            res.cookie("instaToken", token, {
                secure: true, httpOnly: true, sameSite: "none",
                maxAge: 9999999999
            })

            return res.json(user)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    signIn = async (req, res) => {
        try {
            const user = req.user
            if (!user) return res.status(400).send()

            const token = generateJwt(user._id)
            res.cookie("instaToken", token, {
                secure: true, httpOnly: true, sameSite: "none",
                maxAge: 9999999999
            })

            return res.json(user)


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    check = async (req, res) => {
        try {
            const user = req.user
            if (!user) return res.status(401).send()

            return res.json(user)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    logout = async (req, res) => {
        try {
            res.clearCookie("instaToken")
            return res.json(true)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    getOne = async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id).populate("posts")
            if (!user) return res.status(404).json({ message: "User with this id not found" })

            return res.json(user)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    getRecomendations = async (req, res) => {
        try {
            const users = await User.find().sort({ followers: -1 }).limit(5)
            return res.json(users)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }


    searchUsers = async (req, res) => {
        try {
            const search = req.query.search
            const users = await User.find({
                $or: [
                    { username: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            })

            return res.json(users)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }
}

export default new UsersController()