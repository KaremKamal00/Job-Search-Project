import mongoose from "mongoose";

export const connection=async (req,res,next)=>{
    return await mongoose.connect(process.env.URI).then(()=>{
        console.log("DB Connected");
    }).catch(error=>{
        console.log("Fail To connect");
    })
}

