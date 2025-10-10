import mongoose from "mongoose"
export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected")
    }
    catch(err){
        console.log("mongodb connection error",err)
    }
}