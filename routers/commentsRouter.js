import { Router } from "express";
import commentsController from "../controllers/commentsController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const commentsRouter = new Router()


commentsRouter.post("/", checkAuth, commentsController.create)
commentsRouter.delete("/:id", checkAuth, commentsController.delete)