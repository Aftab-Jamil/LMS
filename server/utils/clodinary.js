import {v2 as cloudinary} from "cloudinary"
// CLOUD_NAME=desbyrloi
// CLOUD_API_KEY=375268257466132
// CLOUD_SECRET_KEY=a0yJMW1b2eu3gKDw_kGxniB91A8
import dotenv from "dotenv"
dotenv.config({})
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})
export const uploadMedia=async(file)=>{
    try {
        const result= await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return result;
    } catch (error) {
        console.log(error);
        
        
    }
}
export const deleteMediaFromCloudinary=async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)        
    }
}
export const deleteVideoFromCloudinary=async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"})
    } catch (error) {
        console.log(error)        
    }
}

