import { Comment } from "../models/Comment.js"
import { Post } from "../models/Post.js"
import { User } from "../models/User.js"


class CommentssController {

    create = async (req, res) => {
        try {
            const userId = req.user._id
            const { text, postId } = req.body

            const comm = await Comment.create({ user: userId, text, postId })
            await comm.populate("user", "-password")

            await User.findByIdAndUpdate(userId, { $push: { comments: comm._id } })
            await Post.findByIdAndUpdate(postId, { $push: { comments: comm._id } })

            return res.json(comm)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }


    getAll = async (req, res) => {
        try {


        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }



    delete = async (req, res) => {
        try {
            const userId = req.user._id
            const { id } = req.params.id
            const { postId } = req.body

            const comm = await Comment.findByIdAndDelete(id)
            await Post.findByIdAndUpdate(postId, { $pull: { comments: comm._id } })
            await User.findByIdAndUpdate(userId, { $pull: { comments: comm._id } })

            return res.json(comm)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }



}

export default new CommentssController()