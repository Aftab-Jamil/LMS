import passport from "passport";
import { User } from "../Entities/user.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const userData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          photoUrl: profile.photos[0].value,
        //   googleId: profile.id,
          password :profile.displayName+"@123", // Set a default password for Google 
        };
  
        // Check if user already exists in DB
        let user = await User.findOne({ email: userData.email });
        if (!user) {
          // Create new user if not exists
          user = await User.create(userData);
        }
  
        return done(null, user); // Send user to callback route
      }
    )
  );
  