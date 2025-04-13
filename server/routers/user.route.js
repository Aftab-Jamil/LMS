import express from "express"
import { register, login, logout, getUser, editProfile} from "../controllers/user.controller.js";
import userFieldvalidation from "../middlewares/registrationFieldValidation.js"
import loginValidation from "../middlewares/loginFieldValidation.js";
import isAuthenticated from "../middlewares/IsAuthenticated.js";
import upload from "../utils/multer.js";
import passport from "passport";
import generateToken from "../utils/generateToken.js";

const router=express.Router();
router.post("/register",userFieldvalidation,register)
router.post("/login",loginValidation,login)
router.post("/logout",logout)
router.get("/profile",isAuthenticated,getUser)
router.put("/profile/update",isAuthenticated,upload.single("profilePhoto"),editProfile)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Use your existing token generator
    generateToken(res, req.user, "Successfully Logged in with Google");
  })
export default router;
