import joi from "joi";
import generalFields from "../../utils/generalFields.js";


export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()

export const createJobSchema=joi.object({
    title: joi.string().min(2).max(20).required(),
    Description: joi.string().min(1).max(60),
    workingTime: joi.string().min(1).max(60),
    technicalSkills: joi.array().min(1).max(20),
    softSkills: joi.array().min(1).max(20),
    location:joi.string(),
    seniorityLevel:joi.string(),
    companyId: generalFields.id


}).required()

export const updateJobSchema=joi.object({
    title: joi.string().min(2).max(20),
    Description: joi.string().min(1).max(60),
    workingTime: joi.string().min(1).max(60),
    technicalSkills: joi.array().min(1).max(20),
    softSkills: joi.array().min(1).max(20),
    location:joi.string(),
    seniorityLevel:joi.string(),
    jobId:generalFields.id



}).required()

export const getCompanyJobsSchema=joi.object({
    companyName:joi.string().min(1).max(20)
}).required()


export const makeApplictionSchema=joi.object({
    jobId:generalFields._id,
    userId:generalFields._id,
    userTechSkills:joi.string().required(),
    userSoftSkills:joi.string().required(),
    title:joi.string().required(),
    file:generalFields.file


}).required()