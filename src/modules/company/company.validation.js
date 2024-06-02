import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const tokenSchema=joi.object({
    authorization:joi.string().required()
}).required()

export const createCompanySchema=joi.object({
    name: joi.string().min(2).max(20).required(),
    description: joi.string().min(1).max(60),
    address: joi.string().min(1).max(60),
    industry: joi.string().min(1).max(20).required(),
    numberOfEmployees: joi.string().min(1).max(20),
    companyEmail: generalFields.email.required(),


}).required()


export const updateCompanySchema=joi.object({
    companyId:generalFields.id,
    name: joi.string().min(1).max(20),
    description: joi.string().min(1).max(60),
    address: joi.string().min(1).max(60),
    industry: joi.string().min(1).max(30),
    numberOfEmployees: joi.string().min(1).max(20),
    companyEmail: generalFields.email


}).required()


export const searchByNameSchema=joi.object({
    companyName: joi.string().min(1).max(20).required()
}).required()


export const getCompanySchema=joi.object({
    companyId:generalFields.id
}).required()

export const allApplicationSchema=joi.object({
    companyId:generalFields.id
}).required()



