import express from "express"
import {protectRoute} from "../middleware/auth.middleware.js"
import {deleteMessage, getMessages, getUsersForSidebar, sendMessage}  from  "../controllers/message.countrollers.js"
import multer from "multer";

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() });

router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,upload.single("image"),sendMessage)
router.delete("/delete/message",protectRoute,deleteMessage)
export default router
