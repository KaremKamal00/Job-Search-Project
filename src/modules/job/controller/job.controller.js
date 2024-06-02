import applictionModel from "../../../../DB/models/Appliction.model.js";
import companyModel from "../../../../DB/models/Company.model.js";
import jobModel from "../../../../DB/models/Job.model.js";
import { ApiFeatures } from "../../../utils/apiFeatures.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

//1-check if job is found-->
//2-create a new Job

export const addjob=asyncHandler(
    async (req,res,next)=>{
        const {companyId}=req.body
        const company=await companyModel.findOne({_id:companyId,isDeleted:false})
        if(!company){
            return next(new Error("Company Not Found Or Deleted",{cause:404}))
        }

        req.body.addedBy=req.user._id
        const newJob=await jobModel.create(req.body)
        return res.status(201).json({message:"Done",job:newJob})
    }
)




//1-get jobId from Params
//2-check if job Found -->
//3-update Must be done by the company HR
//4-Update job

export const updatejob=asyncHandler(
    async (req,res,next)=>{
       
       
        const {jobId}=req.params
      
        const jobFound=await jobModel.findOne({_id:jobId,isDeleted:false})

        if(!jobFound){
            return next(new Error("Job Not Found Or Deleted",{cause:404}))
        }

        if(String(jobFound.addedBy)!=String(req.user._id)){
       return next(new Error('Unauthorized Access For This Company_HR',{cause:401}))
     }

        const updatejob=await jobModel.findByIdAndUpdate({_id:jobId},req.body,{new:true})


        return res.status(200).json({message:"Done",job:updatejob})

    
        

    }
)

//1-get jobId from Params
//2-check if job Found -->
//3-delete Must be done by the company HR
//4-delete job

export const deletejob=asyncHandler(
    async (req,res,next)=>{
       
       
        const {jobId}=req.params
      
        const jobFound=await jobModel.findOne({_id:jobId})

        if(!jobFound){
            return next(new Error("Job Not Found Or Deleted",{cause:404}))
        }

        if(String(jobFound.addedBy)!=String(req.user._id)){
           return next(new Error('Unauthorized Access For This Company_HR',{cause:401}))
       }

        const updatejob=await jobModel.findByIdAndDelete({_id:jobId})
        return res.status(200).json({message:"Done"})

    
        

    }
)



//1-get JobId from params
//2-JobExist-->Not Found
//3-make softDelete

export const softDeletejob=asyncHandler(
    async(req,res,next)=>{
        const {jobId}=req.params
        const job=await jobModel.findOne({_id:jobId})
        if (!job) {
            return next(new Error("job Not Found",{cause:404}));
        }
        if(job.isDeleted){
            return res.status(200).json({message:"job Already Soft Deleted"})
        }
        job.isDeleted=true
        await job.save()
        return res.status(200).json({message:"Done"})
    }
)



//Get all Jobs with their company’s information.

export const jobsWithCompanies=asyncHandler(
    async (req, res, next) => {

        const job=await jobModel.find().populate([
            {
                path:'companyId',
            }
        ])
        return res.status(200).json({message:"Done",job})

    }
)


//Get all Jobs for a specific company
//1-get data
//2-check if company found or not -->
//3-find all jobs with company
export const getCompanyJobs=asyncHandler(
    async(req,res,next)=>{
        const {companyName} = req.query
        const company=await companyModel.findOne({name:companyName})
        if(!company){
            return next(new Error('Company not found',{cause:404}))
        }
        

        const allJobs=await jobModel.find({companyId:company._id})
        return res.status(200).json({message:"Done",allJobs})
    }
)



export const allJobsWithFilter=asyncHandler(
    async(req,res,next)=>{

        const apiFeature=new ApiFeatures(jobModel.find(),req.query).filter()
        const jobs=await apiFeature.mongooseQuery

        return res.status(200).json({message:"Done",jobs})
    }
)

//1-check if job exists(title)-->
//2-check if user add application for one job-->not authorize to add another application in one job 
//3-add pdf
//4-create appliction

export const makeAppliction=asyncHandler(
    async (req,res,next)=>{
        
        const job = await jobModel.findOne({ title: req.body.title });
        
            if (!job) {
                return next(new Error("Job Not Found", { cause: 404 }));
            }

            
        const existingApplication = await applictionModel.findOne({ userId: req.user._id, jobId: req.body.jobId });
        if (existingApplication) {
            return next(new Error("Already applied to this job", { cause: 409 }));
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,
            { folder:`${process.env.APP_NAME}/Appliction` },
        );

        
    
        if (!secure_url) {
            return next(new Error("Pdf not found", { cause: 400 }));
        }
         req.body.userResume = { public_id, secure_url }
        req.body.userId=req.user._id

        const createAppliction=await applictionModel.create(req.body)
        return res.status(201).json({message:"Done",Appliction:createAppliction})
        

    }
)


