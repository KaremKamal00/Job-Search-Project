import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

//1-check if email found-->(optional)
//2-check email confirmed-->(optional)
//3-check if change Email
//4- check if the new email is already in use by another account
//5- check if the new mobile is already in use by another account
//6-update account
export const updateAccount=asyncHandler(
    async(req,res,next)=>{
        
        const {_id}=req.user
        const user=await userModel.findOne({_id,isDeleted:false})
        if(!user){
            return next(new Error("User Is deleted",{cause:400}))
        }


        if(req.body.email){
            // check if the new email is already in use by another account
            const emailExist=await userModel.findOne({email:req.body.email})
            if(emailExist && emailExist._id.toString()!=req.user._id){
                return next(new Error(`This email is Already In Use`,{cause:409}))
            }

        }

        if(req.body.mobileNumber){
            // check if the new mobile is already in use by another account
            const mobileExist=await userModel.findOne({mobileNumber:req.body.mobileNumber})
            if(mobileExist && mobileExist._id.toString()!=req.user._id){
                return next(new Error(`This mobile is Already In Use`,{cause:409}))
            }

        }

    // Manually update the username field based on the updated firstName and lastName
        const updatedUsername =` ${req.body.firstName.toLowerCase()}_${req.body.lastName.toLowerCase()}`;
        
        const updateAccount=await userModel.findByIdAndUpdate(req.user._id,{...req.body,userName:updatedUsername},{new:true})
        return res.status(200).json({message:"Done",updateAccount})


     }
)



//1-userExist-->Not Found(optional)
//2-softDelete

export const softDeleteUser=asyncHandler(
    async(req,res,next)=>{
        const user=await userModel.findOne({_id:req.user._id})
        user.isDeleted=true
        await user.save()
        return res.status(200).json({message:"Done"})
    }
)



//1-get userId from Params
//2-check if User Found -->
//3-delete user

export const deleteUser=asyncHandler(
    async (req,res,next)=>{
       
       const{_id}=req.user
        
      
        const userFound=await userModel.findOne({_id})

        if(!userFound){
            return next(new Error("Job Not Found Or Deleted",{cause:404}))
        }


        await userModel.findByIdAndDelete({_id})
        return res.status(200).json({message:"Done"})

    
        

    }
)




//Get user account data 

export const getAccountData=asyncHandler(
    async(req,res,next)=>{
        

        const profile=await userModel.findOne({_id:req.user._id,isDeleted:false})
        if(!profile){
            return next(new Error('User not found or SoftDeleted',{causse:404}))
        }

        return res.status(200).json({message:"Done",profile})
    }
)
//Get profile data for another user
//1-get userId from params
//2-find profile data
export const getProfileData=asyncHandler(
    async(req,res,next)=>{
        const AccountData=await userModel.findOne({email:req.params.email})
        return res.status(200).json({message:"Done",AccountData})
    }
)

//Get all accounts associated to a specific recovery Email 
export const accountsWithRecoveryEmail=asyncHandler(
    async (req,res,next)=>{
    
        const accounts=await userModel.find({recoveryEmail:req.body.recoveryEmail})

        if (accounts?.length==0) {
            return next(new Error("No User Found With This Recovery Email", { cause: 404 }));
        }
        return res.status(200).json({message:"Done",accounts})

    }
)

