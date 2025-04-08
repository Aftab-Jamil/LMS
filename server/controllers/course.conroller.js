import { Course } from "../Entities/Course.js";
import { PaymentDetail } from "../Entities/PaymentDetail.js";
import { User } from "../Entities/user.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/clodinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                success: false,
                message: "Please fill the required details"
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.userId
        })
        return res.status(201).json({
            success: true,
            course,
            message: "Created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create"
        })

    }
}
export const getCreatorCourse = async (req, res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(404).json({
                message: "Course not found",
                courses: []
            })
        }
        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses"
        })

    }
}
export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const courseThumbnail = req.file;
        
        let course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        let newThumbnail;
        if (courseThumbnail) {
            if (course.courseThumbnail) {
                // deleting old thumbnail
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId)
            }
            newThumbnail = await uploadMedia(courseThumbnail.path);
        }
        const courseData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: newThumbnail?.secure_url }
        const updatedCourse = await Course.findByIdAndUpdate(courseId, courseData, { new: true })
        return res.status(200).json({
            success: true,
            course: updatedCourse,
            message: "Course updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: "Failed to update"
        })
    }

}
export const getCourseByCourseId = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch"
        })

    }
}
export const togglePublishCourse =async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.body
        const course= await Course.findById(courseId)
        if(!course){
            console.log(course)
            return res.status(404).json({
                success: false,
                messgage:"Course not found"
            })
        }
        course.isPublished=publish==="true"
        await course.save()
        const statusMessage=course.isPublished ? "Published" : "Unpublished"
        return res.status(200).json(
            {
                success:true,
                message:`Course is ${statusMessage}`
            }
        )
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to toggle publish"
        })
    }

}
export const getAllPublishedCourse=async(req,res)=>{
    try {
        const publishedCourses=await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"})
        if(!publishedCourses){
            res.status(404).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            courses:publishedCourses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch"
        })
        
    }
}
export const getCourseForCourseDetail=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const course = await Course.findById(courseId)
        .populate([{ path: "creator", select: "name" }, { path: "lectures", select: "lectureTitle videoUrl" }]);
            if(!course){
            res.status(404).json({
                success:false,
                message:"Course Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            course
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Course Details"
        })
    }
}
export const getCourseWithPaymentStatus = async (req, res) => {
    try {
        console.log("🔹 Params:", req.params);
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Course ID is required" });
        }

        // Fetch course details
        const course = await Course.findById(courseId).populate([{ path: "creator", select: "name" }, { path: "lectures", select: "lectureTitle videoUrl" }])
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // If user is not logged in, return only course details
        if (!req.userId) {
            return res.status(200).json({
                success: true,
                course
            });
        }

        // If user is logged in, fetch payment details
        const userId = req.userId; // Extracted from authentication middleware
        const paymentDetails = await PaymentDetail.findOne({ userId, courseId,status:"completed"});

        return res.status(200).json({
            success: true,
            course,
            ...(paymentDetails && { paymentDetails }) // Include payment details only if they exist
        });

    } catch (error) {
        console.error("❌ Error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
export const getEnrolledCourses=async(req,res)=>{
    try {
        const userId=req.userId;
        const user = await User.findById(userId)
        .populate({
            path: "enrolledCourses",
            populate: {
                path: "creator",  // Nested populate to get creator details
                select: "name photoUrl"  // Select only name and photoUrl
            }
        })
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Courses Not found"
            })
        }
        return res.status(200).json({
            success:true,
            courses:user.enrolledCourses
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
export const searchCourse=async(req,res)=>{
    try {
        const {query="",categories=[],sortByPrice=""}=req.query
        const searchCriteria = {
            isPublished:true,
            $or:[
                {courseTitle: {$regex:query, $options:"i"}},
                {subTitle: {$regex:query, $options:"i"}},
                {category: {$regex:query, $options:"i"}},
            ]
        }
        if(categories.length>0){
            searchCriteria.category = {$in: categories};
        }
         // define sorting order
         const sortOptions = {};
         if(sortByPrice === "low"){
             sortOptions.coursePrice = 1;//sort by price in ascending
         }else if(sortByPrice === "high"){
             sortOptions.coursePrice = -1; // descending
         }
        const courses=await Course.find(searchCriteria).populate({path:"creator",select:"name photoUrl"}).sort(sortOptions)
        console.log(searchCriteria)
        return res.status(200).json({
            success:true,
            courses:courses || []
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
