import { Router } from "express";
import postsController from "../controllers/postsController.js";
import { checkAuth } from "../middleware/checkAuth.js"
import { upload } from "../middleware/multer.js"

export const postsRouter = new Router()

postsRouter.post("/", checkAuth, upload.single("img"), postsController.create)
postsRouter.get("/", postsController.getAll)
postsRouter.delete("/:id", checkAuth, postsController.delete)

postsRouter.post('/like/:id', checkAuth, postsController.like)
postsRouter.delete('/unlike/:id', checkAuth, postsController.unlike)