import User from "../models/user.model.js"
import  {generateToken}  from "../lib/utils.js";
import bcrypt from "bcryptjs"
import clodinary from "../lib/cloudinary.js";
export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        if(!fullName || !email || !password){
           return res.status(400).json({message:"All the feilds are required"})
        }
        if(password.length < 6){
           return res.status(400).json({message:"password must be atleast 6 characters"})
        }
                                                                       
        const user = await User.findOne({email})
        if (user) return res.status(400).json({message:"user already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        })
        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
               _id:newUser._id,
               fullName:newUser.fullName,
               email:newUser.email,
               profilePic:newUser.profilePic,
               createdAt:user.created_at
            }); 
        }
        else{
            return res.status(400).json({message:"Invalid user data"})
        }
    }
    catch(err){
        console.log("Error in signUp",err.message)
        return res.status(500).json({message:"internal server error"})
    } 
}
export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user || !user.password){
            return res.status(400).json({message:"invalid credentials"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if (!isPasswordCorrect){
            return res.status(400).json({message:"invalid credentials"})
        }
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            createdAt:user.created_at
        })
    }
    catch(err){
        console.log("error in login controller",err)
        return res.status(500).json({message:"internal server error"})
    }
}
export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }
    catch(err){
        console.log("error in logout controller",err.message)
        return res.status(500).json({message:"internal server error"})
    }
}

export const updateProfile= async (req,res)=>{

    try {
       
       const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadStream = clodinary.uploader.upload_stream(
      { resource_type: "image", folder: "profile_pics" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePic: result.secure_url },
          { new: true }
        );

        return res.status(200).json({
            _id:updatedUser._id,
            fullName:updatedUser.fullName,
            email:updatedUser.email,
            profilePic:updatedUser.profilePic,
            createdAt:updatedUser.created_at
        })
      }
    );

    uploadStream.end(req.file.buffer);
    } catch (error) {
        console.log("error in updating image",error.message)
        return res.status(500).json({message:"internal server error"})
    }

}

export const check = (req,res)=>{
    const user = req.user
   try {
     res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            createdAt:user.created_at
        })
   } catch (error) {
    console.log("error in check auth controller",error.message)
        return res.status(500).json({message:"internal server error"})
   }
}