import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://aftabjamil0786:YZf8IrSi0ZXQInWc@cluster0.4lp4h.mongodb.net/")
        console.log("mongodb connected")
        
    } catch (error) {
        console.log("error : "+ error)
        
    }
}
export default connectDB;