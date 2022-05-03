import { Router } from "express";
import { commentsRouter } from "./commentsRouter.js";
import { followRouter } from "./followRouter.js";
import { postsRouter } from "./postsRouter.js";
import { profileRouter } from "./profileRouter.js";
import { usersRouter } from "./usersRouter.js";


export const router = new Router()


router.use("/users", usersRouter)
router.use("/follow", followRouter)
router.use("/posts", postsRouter)
router.use("/comments", commentsRouter)
router.use("/profile", profileRouter)