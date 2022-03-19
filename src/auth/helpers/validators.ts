import { body, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

export const signupValidationRules = () => {
    return [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Invalid email').notEmpty().isEmail().normalizeEmail(),
    body('auth_type', 'Auth type is required').notEmpty(),
    body('password', 'Password is required (min 5 character)')
    .if(body('auth_type').equals('email'))
    .notEmpty()
    .isLength({min: 5})]
}

export const signinValidationRules = () => {
    return [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Invalid email').notEmpty().isEmail().normalizeEmail(),
    body('auth_type', 'Auth type is required').notEmpty(),
    body('password', 'Password is required (min 5 character)')
    .if(body('auth_type').equals('email'))
    .notEmpty()
    .isLength({min: 5})]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors: any = []
    errors.array({onlyFirstError: true})
    .map((err) => extractedErrors.push({[err.param]:err.msg}))

    return res.status(422).json({errors: extractedErrors})
}