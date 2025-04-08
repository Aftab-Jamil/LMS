import { Course } from "../Entities/Course.js";
import { CourseProgress } from "../Entities/CourseProgress.js";

export const getCourseProgress = async (req, res) => {
    try {
        const userId = req.userId
        const { courseId } = req.params;
        console.log(courseId)
        const courseDetails = await Course.findById(courseId).populate("lectures");
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }
        const courseProgress = await CourseProgress.findOne({ userId, courseId }).populate("courseId")
        // case 1: course progress is not found due to first time access to the course
        if (!courseProgress) {
            return res.status(200).json({
                success: true,
                courseDetails,
                progress: [],
                completed: false
            }
            )
        }
        // case 2 : return course details with progress
        return res.status(200).json({
            success: true,
            courseDetails,
            progress: courseProgress.lectureProgress,
            completed: courseProgress.completed
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}
export const updateLectureProgress = async (req, res) => {
    try {
        const userId = req.userId
        const { courseId, lectureId } = req.params
        let courseProgress = await CourseProgress.findOne({ userId, courseId })
        if (!courseProgress) {
            // If no progress exist, create a new record
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: [],
            });
        }
        // finding index of the lecture in course progress if exits
        let index = courseProgress.lectureProgress.findIndex((lecture)=>lecture.lectureId===lectureId)
        if(index!==-1){
            courseProgress.lectureProgress[index].viewed=true;
        }else{
            courseProgress.lectureProgress.push({
                lectureId,
                viewed:true
            })
        }
        let lectureProgressLength=courseProgress.lectureProgress.filter((lecture)=>lecture.viewed).length;
        const course=await Course.findById(courseId)
        if(lectureProgressLength===course.lectures.length){
            courseProgress.completed=true;
        }
        courseProgress.save()
        return res.status(200).json({
            success:true,
            message:"Progress Updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}