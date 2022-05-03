import { User } from "../models/User.js"

class FollowController {

    follow = async (req, res) => {
        try {
            const id = req.params.id

            const me = await User.findById(req.user._id)
            const user = await User.findById(id)

            if (!user.followers.includes(me._id)) {
                await user.updateOne({ $push: { followers: me._id } })
                await me.updateOne({ $push: { follows: user._id } })

                return res.json({ user, followerId: me._id })
            }


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    unfollow = async (req, res) => {
        try {
            const id = req.params.id

            const me = await User.findById(req.user._id)
            const user = await User.findById(id)

            if (user.followers.includes(me._id)) {
                await user.updateOne({ $pull: { followers: me._id } })
                await me.updateOne({ $pull: { follows: user._id } })

                return res.json({ user, followerId: me._id })
            }


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


}

export default new FollowController()