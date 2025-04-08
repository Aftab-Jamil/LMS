import express from 'express'
import isAuthenticated from '../middlewares/IsAuthenticated.js';
import { createCourse, editCourse, getAllPublishedCourse, getCourseByCourseId, getCourseWithPaymentStatus, getCreatorCourse, getEnrolledCourses, searchCourse, togglePublishCourse } from '../controllers/course.conroller.js';
import upload from '../utils/multer.js';
import { createLecture, editLecture, getAllLecture, getLectureByLectureId, removeLectureByLectureId } from '../controllers/lecture.controller.js';
import courseDetailsBasedOnAuthentication from '../middlewares/CourseDetailsBasedOnAuthentication.js';

const router=express.Router();
router.post("/",isAuthenticated,createCourse)
router.get("/",isAuthenticated,getCreatorCourse)
router.get("/search",searchCourse)
router.get("/enrolled-courses",isAuthenticated,getEnrolledCourses);
router.get("/course-details/:courseId",courseDetailsBasedOnAuthentication,getCourseWithPaymentStatus)
router.get("/published-course",getAllPublishedCourse)
router.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.get("/:courseId",isAuthenticated,getCourseByCourseId)
router.post("/:courseId/lecture",isAuthenticated,createLecture)
router.get("/:courseId/lecture",isAuthenticated,getAllLecture)
router.get("/:courseId/lecture/:lectureId",isAuthenticated,getLectureByLectureId);
router.delete("/:courseId/lecture/:lectureId",isAuthenticated,removeLectureByLectureId);
router.put("/:courseId/lecture/:lectureId",isAuthenticated,editLecture);
router.patch("/:courseId",isAuthenticated,togglePublishCourse);
export default router;