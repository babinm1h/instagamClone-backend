import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"
import { User } from "../models/User.js";



passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },

    async (email, password, done) => {
        const user = await User.findOne({ email })
        if (!user) return done(null, false)

        const comparePass = await bcrypt.compare(password, user.password)
        if (!comparePass) return done(null, false)

        return done(null, user)
    }))


passport.serializeUser((id, done) => {
    done(null, id)
})


passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})


export { passport };