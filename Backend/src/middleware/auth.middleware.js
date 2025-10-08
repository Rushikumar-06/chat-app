import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
           return res.status(401).json({message:"Unouthorized - No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({message:"Unouthorized - No token provided"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        req.user = user
        next()
        
    }
    catch(err){
        console.log("Error in protect route middleware",err.message)
        return res.status(500).json({message:"Internal server error"})
    }
}