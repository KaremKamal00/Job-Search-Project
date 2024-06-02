import joi from "joi";
import generalFields from "../../utils/generalFields.js";


export const updateUser=joi.object({
    firstName:joi.string().min(2).max(20),
    lastName:joi.string().min(2).max(20),
    email:generalFields.email,
    recoveryEmail:generalFields.email,
    mobileNumber:joi.string(),
    DOB:joi.string().pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/)),
    role:joi.string(),

}).required()




export const accountsWithRecoveryEmailSchema=joi.object({
    recoveryEmail:generalFields.email.required()

}).required()


export const getProfileDataSchema=joi.object({
    recoveryEmail:generalFields.email.required()

}).required()