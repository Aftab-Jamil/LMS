// import jwt from "jsonwebtoken"
// const generateToken=(res,user,message)=>{
//     console.log("successfully logged in ");
    
//     const token=jwt.sign({userId: user._id},process.env.JWT_SECRET_ID,{expiresIn: "1d"})
    
//     return res.status(200).cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:24*60*60*1000}).json({
//         success: true,
//         message,
//         user
//     }) 
// }
// export default generateToken;
import jwt from "jsonwebtoken";

const generateToken = (res, user, message, redirectUrl = null) => {
    console.log("successfully logged in");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_ID, { expiresIn: "1d" });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    if (redirectUrl) {
        // Redirect if a URL is provided
        return res.redirect(redirectUrl);
    }

    // Otherwise, send a JSON response
    return res.status(200).json({
        success: true,
        message,
        user,
    });
};

export default generateToken;