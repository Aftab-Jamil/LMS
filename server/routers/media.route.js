import express from 'express'
import upload from '../utils/multer.js'
import { uploadMedia } from '../utils/clodinary.js'
const router=express.Router()
router.post('/upload-video',upload.single('file'),async(req,res)=>{
    try {
        const videoInfo=await uploadMedia(req.file.path)
        return res.status(200).json({
            success:true,
            message:"Successfully uploaded",
            videoInfo
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to upload"
        })
    }
})
export default router;