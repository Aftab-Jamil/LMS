import { User } from "../Entities/user.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/clodinary.js";
// registering new user
export const register = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {   // use this not name===""
            return res.status(400).json({
                success: false,
                message: "Please enter all details to register"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashPass
        })
        return res.status(201).json({
            success: true,
            message: "successfully registered"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }
}

// login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or Password not matched"
            })
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(400).json({
                success: false,
                message: "email or password not matched"
            })
        }
        generateToken(res, user, `Welcome ${user.name}`)
        // return res.status(200).json({
        //     success: true,
        //     message: "successfully logged in"
        // })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to login try again later"
        })

    }
}

// logout 
export const logout = (_, res) => {
    try {
        return res.status(200).cookie("token", "", {  
            httpOnly: true, // Match the original cookie options
            sameSite: "none", // Match the original cookie options
            secure: true, // Match the original cookie options
            maxAge: 0, }).json({
            success: true,
            message: "Successfully logout"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Log-Out Failed please try Again"
        })

    }
}

// get User details
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate({
            path: "enrolledCourses",
            populate:{path: "creator", select : "name photoUrl"}
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "something went wrong"
        })

    }


}
const deleteOldPhoto = async (user) => {
    if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
    }
}

// profile edit 
export const editProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name } = req.body
        const profilePhoto = req.file
        const user = await User.findById(userId);
        if (!user) {
            res.status(401).json({
                message: "user not found",
                success: false
            })
        }
        if (name && profilePhoto) {
            deleteOldPhoto(user)
            const uplodedResult = await uploadMedia(profilePhoto.path)
            const photoUrl = uplodedResult.secure_url
            const updatedData = { name, photoUrl }
            const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password")
            return res.status(200).json({
                success: true,
                user: updatedUser,
                message: "successfully updated"
            })
        } else if (name) {
            const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true }).select("-password")
            return res.status(200).json({
                success: true,
                user: updatedUser,
                message: "name successfully updated"
            })
        } else if (profilePhoto) {
            deleteOldPhoto(user)
            const uplodedResult = await uploadMedia(profilePhoto.path)
            const photoUrl = uplodedResult.secure_url
            const updatedUser = await User.findByIdAndUpdate(userId, { photoUrl }, { new: true }).select("-password")
            return res.status(200).json({
                success: true,
                user: updatedUser,
                message: "profile image successfully updated"
            })
        } else {
            return res.status(200).json({
                success: true,
                user,
                message: "no changes in your profile"
            })
        }
        // if(!name && !req.file){
        //     return res.status(200).json({
        //         success: true,
        //         user,
        //         message : "no changes in your profile"
        //     })
        // }
        // let updatedUser;
        // deleting old image
        // if (req.file) {
        //     if (user.photoUrl) {
        //         const publicId = user.photoUrl.split("/").pop().split(".")[0];
        //         await deleteMediaFromCloudinary(publicId);
        //     }

        //     const uplodedResult = await uploadMedia(profilePhoto.path)
        //     const photoUrl = uplodedResult.secure_url
        //     const updatedData = { name, photoUrl }


        //     updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password")
        // } else {
        //     updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true }).select("-password")
        // }
        // return res.status(200).json({
        //     success: true,
        //     user: updatedUser,
        //     message: "successfully updated"
        // })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable to update"
        })

    }

}