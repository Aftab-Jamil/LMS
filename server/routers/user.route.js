import express from "express"
import { register, login, logout, getUser, editProfile} from "../controllers/user.controller.js";
import userFieldvalidation from "../middlewares/registrationFieldValidation.js"
import loginValidation from "../middlewares/loginFieldValidation.js";
import isAuthenticated from "../middlewares/IsAuthenticated.js";
import upload from "../utils/multer.js";

const router=express.Router();
router.post("/register",userFieldvalidation,register)
router.post("/login",loginValidation,login)
router.post("/logout",logout)
router.get("/profile",isAuthenticated,getUser)
router.put("/profile/update",isAuthenticated,upload.single("profilePhoto"),editProfile)

export default router;
