import { Comment } from "../models/Comment.js"
import { Post } from "../models/Post.js"
import { User } from "../models/User.js"
import cloudinary from "../utils/cloudinary.js"

class PostsController {

    create = async (req, res) => {
        try {
            const userId = req.user._id
            const { title } = req.body

            const file = req.file
            if (!file) return res.status(400).json({ message: "You need to upload some image" })

            cloudinary.v2.uploader.upload_stream({ folder: "insta" }, async (err, result) => {
                if (err || !result) return res.status(400).json({ message: "Img upload error" })

                const img = result.secure_url
                let post = await Post.create({ user: userId, img, title })
                post = await post.populate("user", "-password")

                const user = await User.findByIdAndUpdate(userId, { $push: { posts: post._id } })

                return res.json(post)

            }).end(file.buffer)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }


    getAll = async (req, res) => {
        try {
            let posts = await Post.find().sort({ createdAt: -1 }).populate("user comments")
            posts = await Comment.populate(posts, { path: "comments.user" })
            return res.json(posts)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }



    delete = async (req, res) => {
        try {
            const { id } = req.params
            const userId = req.user._id

            const post = await Post.findByIdAndDelete(id)
            const user = await User.findByIdAndUpdate(userId, { $pull: { posts: post._id } })

            return res.json(post)


        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }



    like = async (req, res) => {
        try {
            const { id } = req.params
            const userId = req.user._id

            const post = await Post.findById(id)
            const user = await User.findById(userId)

            if (!post.likes.includes(userId)) {
                await post.updateOne({ $push: { likes: userId } }, { new: true })
                await user.updateOne({ $push: { likes: post._id } }, { new: true })

                return res.json({ post, userId })
            }

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }



    unlike = async (req, res) => {
        try {
            const { id } = req.params
            const userId = req.user._id

            const post = await Post.findById(id)
            const user = await User.findById(userId)

            if (post.likes.includes(userId)) {
                await post.updateOne({ $pull: { likes: userId } }, { new: true })
                await user.updateOne({ $pull: { likes: post._id } }, { new: true })

                return res.json({ post, userId })
            }

        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }

}

export default new PostsController()