import jwt from "jsonwebtoken"
const generateToken=(res,user,message)=>{
    console.log("successfully logged in ");
    
    const token=jwt.sign({userId: user._id},process.env.JWT_SECRET_ID,{expiresIn: "1d"})
    console.log(token)
    return res.status(200).cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:24*60*60*1000}).json({
        success: true,
        message,
        user
    }) 
}
export default generateToken;
