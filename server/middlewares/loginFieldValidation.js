import { body, validationResult } from "express-validator";

const loginValidation=[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Required field"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            const formattedErrors={}
            errors.array().forEach((error)=>{
                formattedErrors[error.path]=error.msg;
            })
            return res.status(400).json({
                success:false,
                errors:formattedErrors
            })
        }
        next()
    }
]
export default loginValidation;