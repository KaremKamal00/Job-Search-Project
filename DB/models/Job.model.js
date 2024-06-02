import mongoose,{Types,Schema, model} from "mongoose";

export const jobSchema=new Schema({

    title:{
        type:String,
        required:[true,"Please provide the job Title"],
        lowerCase:true
        
    },

    Description:{
        type:String,
        min:1,
        max:60

    },

    workingTime :{
        type:String,
        enum:['part-time','full-time'],
        default:'part-time'
    },

    location :{
        type:String,
        enum:['onsite', 'remotely', 'hybrid'],
        default:'onsite'
    },

    seniorityLevel :{
        type:String,
        enum:['Junior', 'Mid-Level', 'Senior',',Team-Lead','CTO'],
        default:'Junior'
    },

    technicalSkills:[{
        type:String,
        required:[true,"Please provide the technicalSkills"]
    }],

    softSkills:[{
        type:String,
        required:[true,"Please provide the softSkills"]
    }],

    addedBy:{
        type:Types.ObjectId,
        ref:"User",
        required:[true,"Please provide the CompanyHR"]
    },

    isDeleted:{
        type:Boolean,
        default:false
    },

    companyId:{
        type:Types.ObjectId,
        ref:"Company",
        required:[true,"Please provide companyId"] //must modified
    }



    
},{
    timestamps:true
})



const jobModel=model('Job',jobSchema)

export default jobModel