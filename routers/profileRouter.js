import { Router } from "express";
import profileController from "../controllers/profileController.js";
import { checkAuth } from "../middleware/checkAuth.js"
import { upload } from "../middleware/multer.js"

export const profileRouter = new Router()


profileRouter.post("/update", checkAuth, upload.single("img"), profileController.updateProfile)