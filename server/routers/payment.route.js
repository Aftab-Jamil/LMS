import express from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js";
import { createOrder, getAllPurchasedCourseOfACreator, handleFailedPayment, verifyPayment } from "../controllers/payment.controller.js";

const router=express.Router();
router.post("/create-order",isAuthenticated,createOrder)
router.post("/verify-payment",isAuthenticated,verifyPayment)
router.post("/handle-failed-payment",isAuthenticated,handleFailedPayment)
router.get("/",isAuthenticated,getAllPurchasedCourseOfACreator);
export default router;