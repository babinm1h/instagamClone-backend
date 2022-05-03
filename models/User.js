import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: "https://avatars.mds.yandex.net/i?id=43e1df1ae371ea83ec70300a17577172-5236798-images-thumbs&n=13" },

    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    follows: [{ type: mongoose.Types.ObjectId, ref: "User" }],

}, { timestamps: true })


export const User = mongoose.model("User", UserSchema)