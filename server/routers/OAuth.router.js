import express from "express";
import passport from "passport";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Use your existing token generator
    generateToken(res, req.user, "Successfully Logged in with Google","https://lms-frontend-tdti.onrender.com");
  }
);

export default router;
