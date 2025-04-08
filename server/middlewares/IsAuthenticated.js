import jwt from "jsonwebtoken"
const isAuthenticated=async (req,res,next)=>{
    try {
        console.log(req.cookies)
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET_ID)
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        // console.log(decoded);
        req.userId=decoded.userId;
        
        next()
        
    } catch (error) {
        console.log(error)        
    }    
}
export default isAuthenticated;