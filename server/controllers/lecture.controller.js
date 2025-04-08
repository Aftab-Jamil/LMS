import { Course } from "../Entities/Course.js";
import { Lecture } from "../Entities/Lecture.js";
import { deleteVideoFromCloudinary } from "../utils/clodinary.js";

export const createLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { lectureTitle } = req.body;
        const course = await Course.findById(courseId)
        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title is required"
            })
        };
        if (!course) {
            req.status(404).json({
                success: false,
                message: "course not found with this courseId"
            })
        }
        const lecture = await Lecture.create({ lectureTitle });
        course.lectures.push(lecture._id)
        await course.save()
        return res.status(201).json({
            success: true,
            lecture,
            message: "Lecture created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create"
        })
    }

}
export const getAllLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures")
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            lectures: course.lectures
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch"
        })
    }

}
export const getLectureByLectureId=async(req,res)=>{
    try {
        const {lectureId}=req.params
        const lecture=await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                success:false,
                message:"Lecture not found"
            })
        }
        return res.status(200).json({
            success:true,
            lecture
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to Fetch"
        })
        
    }
}
export const removeLectureByLectureId=async(req,res)=>{
    try {
        const {lectureId}=req.params
        const lecture=await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({
                success:false,
                message:"Lecture Not Found"
            })
        }
        if(lecture.publicId){
            await deleteVideoFromCloudinary(publicId)
        }
        await Course.updateOne(
            {lectures:lectureId}, // find the course that contains the lecture
            {$pull:{lectures:lectureId}} // Remove the lectures id from the lectures array
        );
        return res.status(200).json({
            success:true,
            message:"Deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete"
        })
    }
}
export const editLecture=async(req,res)=>{
    try {
        const {lectureId}=req.params
        const {lectureTitle,videoInfo,isPreviewFree}=req.body
        const lecture=await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                success:false,
                message:"Lecture not found"
            })
        }
        if(lecture.publicId){
            await deleteVideoFromCloudinary(lecture.publicId)
        }
        if(lectureTitle) lecture.lectureTitle=lectureTitle
        if(videoInfo && videoInfo?.videoUrl) lecture.videoUrl=videoInfo?.videoUrl
        if (typeof isPreviewFree === "boolean") {
            lecture.isPreviewFree = isPreviewFree;
        }
        if(videoInfo && videoInfo?.publicId) lecture.publicId=videoInfo?.publicId
        lecture.save()
        return res.status(200).json({
            success:true,
            lecture,
            message:"Successfully updated"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to update lecture"
        })
    }
}