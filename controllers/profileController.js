import { User } from "../models/User.js"
import cloudinary from "../utils/cloudinary.js"

class FollowController {

    updateProfile = async (req, res) => {
        try {
            const { username, email } = req.body
            const file = req.file

            const user = await User.findById(req.user._id)

            const candidate = await User.findOne({ email })
            if (candidate && user.email !== email) {
                return res.status(400).json({ message: "This email already in use" })
            }


            if (file) {
                cloudinary.v2.uploader.upload_stream({ folder: "insta" }, async (err, result) => {
                    if (err || !result) return res.status(500).json({ message: "Image upload error" })

                    const imgUrl = result.secure_url;

                    const updated = await User.findByIdAndUpdate(req.user._id, {
                        $set: { img: imgUrl, email: email, username: username }
                    }, { new: true })

                    return res.json({ user: updated, img: imgUrl })

                }).end(file.buffer)
            }
            else {
                const updated = await User.findByIdAndUpdate(req.user._id, {
                    $set: { email: email, username: username }
                }, { new: true })

                return res.json({ user: updated })
            }



        } catch (err) {
            return res.status(500).json({ message: "Server err0r", err })
        }
    }



}

export default new FollowController()