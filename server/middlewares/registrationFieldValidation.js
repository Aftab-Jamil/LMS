import { body, validationResult } from "express-validator";

const validateUserRegistration = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name should be at least 3 characters long"),
    body("email")
        .isEmail().withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password length should be at least 6 characters"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedError={}
            errors.array().forEach((errorObject) => {
                formattedError[errorObject.path]=errorObject.msg;
                
            });
            return res.status(400).json({
                success: false,
                errors: formattedError
            });
        }
        next();
    }
];

export default validateUserRegistration;
