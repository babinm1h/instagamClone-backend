import { Router } from "express";
import followController from "../controllers/followController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const followRouter = new Router()


followRouter.post("/:id", checkAuth, followController.follow)
followRouter.delete("/:id", checkAuth, followController.unfollow)