import express from "express"
import {signup,login,logout,updateProfile,check} from "../controllers/auth.controllers.js"
import {protectRoute} from "../middleware/auth.middleware.js"
import multer from "multer";
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() });

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile",protectRoute,upload.single("profilePic"),updateProfile)

router.get("/check", protectRoute , check)

export default router
