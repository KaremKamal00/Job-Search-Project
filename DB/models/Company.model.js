import mongoose,{Types,Schema, model} from "mongoose";

export const companySchema=new Schema({

    name:{
        type:String,
        required:[true,"Please provide the Company Name"],
        unique:true,
        lowerCase:true,
        min:1
    },

    description :{
        type:String,
        min:1,
        max:50
    },

    industry:{
        type:String,
        required:[true,"Please provide the Industry"]
    },
    address:String,

    numberOfEmployees:{
        type:Number,
        min:1,
        max:8
    },
    companyEmail:{
        type: String,
        required:[true,"Please provide the companyEmail"],
        unique:true
    },
    companyHR:{
        type:Types.ObjectId,
        ref:"User",
        required:[true,"Please provide the companyHR"] //need to Change after Adding userModel
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

companySchema.virtual("Job",{
    ref:"Job",
    localField:"_id",
    foreignField:"companyId"
})




const companyModel=model('Company',companySchema)

export default companyModel