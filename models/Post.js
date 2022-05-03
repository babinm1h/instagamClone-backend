import mongoose from "mongoose";



const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    title: { type: String, required: true },
    img: { type: String, required: true }

}, { timestamps: true })


export const Post = mongoose.model("Post", PostSchema)