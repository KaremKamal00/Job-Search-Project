import mongoose,{Types,Schema, model} from "mongoose";

export const applictionSchema=new Schema({

jobId:{
    type:Types.ObjectId,
    ref:"Job",
    required:[true,"jobId is required"]
},

userId:{
    type:Types.ObjectId,
    ref:"User",
    required:[true,"userId is required"]
},

userTechSkills:{
    type:[String],
    required:[true,"userId is userTechSkills"]
},

userSoftSkills:{
    type:[String],
    required:[true,"userId is userSoftSkills"]
},

// userResume:{
//     type:[String],
//     required:[true,"userId is userResume"]
// }

userResume: [{
    type:Object
}]


    
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

applictionSchema.virtual("User",{
    ref:"User",
    localField:"userId",
    foreignField:"_id"
})


const applictionModel=model('Appliction',applictionSchema)

export default applictionModel