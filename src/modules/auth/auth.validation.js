import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const signUpSchema=joi.object({
    firstName:joi.string().min(2).max(20).required(),
    lastName:joi.string().min(2).max(20).required(),
    email:generalFields.email.required(),
    recoveryEmail:generalFields.email,
    password:generalFields.password.required(),
    mobileNumber:joi.string(),
    DOB:joi.string().pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/)),
    role:joi.string(),
    cPassword:joi.string().valid(joi.ref('password')).required()

}).required()


export const loginSchema=joi.object({
    emailOrMobileNumber:generalFields.email,
    emailOrMobileNumber:joi.string().required(),
    password:generalFields.password.required()

}).required()


export const sendCodeSchema=joi.object({
    email:generalFields.email.required()

}).required()


export const forgetPasswordSchema=joi.object({
    email:generalFields.email.required(),
    code:joi.string().pattern(new RegExp(/^[0-9]{5}$/)).required(),
    password:generalFields.password.required(),
    cPassword:joi.string().valid(joi.ref('password')).required()

}).required()


export const updatePassword=joi.object({
    email:generalFields.email,
    oldPassword:joi.string().required(),
    newPassword:generalFields.password.required(),
    cPassword:joi.string().valid(joi.ref('newPassword')).required()

}).required()