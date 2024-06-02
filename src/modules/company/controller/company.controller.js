import applictionModel from "../../../../DB/models/Appliction.model.js";
import companyModel from "../../../../DB/models/Company.model.js";
import jobModel from "../../../../DB/models/Job.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

//1-companyExist-->
//2-add company HR
//3-create company

export const addCompany=asyncHandler(
    async(req,res,next)=>{
        
        if(await companyModel.findOne({name:req.body.name})){
            return next(new Error("Company Already Exist",{cause:409}));
        }


        req.body.companyHR=req.user._id
        const newCompany = await companyModel.create(req.body)
        return res.status(201).json({message:"Done",company:newCompany})

    }
)

//1-get CompanyId from params
//2-companyExist-->Not Found
//3-Update company

export const updateCompany=asyncHandler(
    async (req,res,next)=>{
        
        const {companyId}=req.params
        const company=await companyModel.findOne({_id:companyId})
        if(!company){
            return next(new Error("Company Not Found",{cause:404}));
        }

        if (await companyModel.findOne({ $or: [ {name:req.body.name} ,  {companyEmail:req.body.companyEmail} ] })) {
            return next(new Error("Name Or companyEmail Already Found", { cause: 409 }));
          }

          

        

        if(String(req.user._id)!=String(company.companyHR)){
            return next(new Error('Unauthorized Access For This Company_HR',{cause:401}))
        }

        const upadteCompany = await companyModel.findOneAndUpdate({_id:companyId},req.body,{new:true})
        return res.status(200).json({message:"Done",company:upadteCompany})

    }
)

//1-get CompanyId from params
//2-companyExist-->Not Found
//3-delete company

export const deleteCompany=asyncHandler(
    async (req,res,next)=>{
        
        const {companyId}=req.params
        const company=await companyModel.findOne({_id:companyId})
        if(!company){
            return next(new Error("Company Not Found",{cause:404}));
        }


        if(String(req.user._id)!=String(company.companyHR)){
            return next(new Error('Unauthorized Access For This Company_HR',{cause:401}))
        }

        const deleteCompany = await companyModel.findOneAndDelete({_id:companyId})
        return res.status(200).json({message:"Done"})

    }
)

//1-get CompanyId from params
//2-companyExist-->Not Found
//3-get company

export const getCompany=asyncHandler(
    async (req,res,next)=>{

        const {companyId}=req.params
        const company=await companyModel.findOne({_id:companyId}).populate([
            {
                path:'Job',
            }
        ])
        if(!company){
            return next(new Error("Company Not Found",{cause:404}));
        }

        return res.status(200).json({message:"Done",company})

    }
)

//1-get CompanyId from params
//2-companyExist-->Not Found

export const softDeleteCompany=asyncHandler(
    async(req,res,next)=>{
        const {companyId}=req.params
        const company=await companyModel.findOne({_id:companyId})
        if (!company) {
            return next(new Error("Company Not Found",{cause:404}));
        }
        if(company.isDeleted){
            return res.status(200).json({message:"Company Already Soft Deleted"})
        }
        company.isDeleted=true
        await company.save()
        return res.status(200).json({message:"Done"})
    }
)

//1-get companyName 
//2-finByName

export const searchByName=asyncHandler(
    async (req, res, next)=>{
        const {companyName}=req.body

        const seachCompany=await companyModel.findOne({name:companyName})
        if(!seachCompany){
            return next(new Error("Company Not Found",{cause:404}));
        }

        return res.status(200).json({message:"Done",seachCompany})
        

    }
)


//1-get companyId in Paramas
//2-check if job exists -->
//3-check company owner must be get the applaction who create the job with yourSelf
//4-get all application for specific job
export const allApplication = asyncHandler(
    async (req, res, next) => {
        const { companyId } = req.params;

        const jobsFound = await jobModel.find({ companyId });
        if (!jobsFound) {
            return next(new Error("Jobs not found", { cause: 404 }));
        }

        
        if (String(jobsFound[0].addedBy) !== String(req.user._id)) {
            return next(new Error('Unauthorized Access For This Company_HR', { cause: 401 }));
        }

        const applications = await applictionModel.find({ jobId: { $in: jobsFound.map(job => job._id) } })
            .populate([{
                path:"User"
            }])

        return res.status(200).json({ message: "Done", applications });
    }
);






