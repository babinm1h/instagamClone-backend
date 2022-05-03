import { Router } from "express";
import passport from "passport";
import usersController from "../controllers/usersController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const usersRouter = new Router()


usersRouter.post("/signUp", usersController.signUp)
usersRouter.post("/signIn", passport.authenticate("local"), usersController.signIn)
usersRouter.get("/check", checkAuth, usersController.check)
usersRouter.get("/logout", usersController.logout)
usersRouter.get("/search", usersController.searchUsers)
usersRouter.get("/:id", usersController.getOne)
usersRouter.get("/user/recomendations", usersController.getRecomendations)
