import jwt from "jsonwebtoken"
const courseDetailsBasedOnAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            // console.log(token)
            req.userId = null; // No token means unauthenticated user
            return next();
        }
        console.log(token)
        const decoded= jwt.verify(token,process.env.JWT_SECRET_ID)
        req.userId = decoded.userId;
        next();

    } catch (error) {
        req.userId = null; // Handle invalid token case
        next();
    }
};
export default courseDetailsBasedOnAuthentication;
