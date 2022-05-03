import multer from "multer"
import path from "path"


const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
    }
})