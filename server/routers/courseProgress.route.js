import express from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js";
import { getCourseProgress, updateLectureProgress } from "../controllers/courseProgress.controller.js";
const router=express.Router();
router.get("/:courseId",isAuthenticated,getCourseProgress)
router.post("/:courseId/lecture/:lectureId",isAuthenticated,updateLectureProgress)
export default router;