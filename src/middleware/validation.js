

export const validation=(schema,includeToken=false)=>{
  return (req,res,next)=>{
    let inputData={...req.body,...req.params,...req.query}
   
    if(req.file||req.files){
      inputData.file=req.file||req.files
    }

    if(req.headers.authorization && includeToken){
      inputData={authorization:req.headers.authorization}
    }
    const validationResult= schema.validate(inputData,{abortEarly:true})
    if(validationResult.error){
      
      req.validationResult=validationResult.error
      return next (new Error("Invalid Validtion",{cause:400}))
    }
    return next()
    
  }
}

export default validation



















// import { Types } from "mongoose";
// export const idValidition=(value,helper)=>{
//   return Types.ObjectId.isValid(value)?true:helper.message("Invaild Id")
// }

// const valdition = (schema) => {
//   return (req, res, next) => {
//     try {
//       let methods
//     if(req.headers.authorization){
      
//       methods={...req.body,...req.params,...req.query,authorization:req.headers.authorization}
//     }
//     else{
//       methods={...req.body,...req.params,...req.query}
//     }
//     if(req.file){
//       methods={...methods,file:req.file}
//     }
//     if(req.files){
//       methods={...methods,files:req.files}
//     }

    
//     const validtionResult = schema.validate(methods)
    
//     if (validtionResult?.error) {
//       return res.json({ message: "done", validtionResult });
//     }
//     return next()
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//     stack:error.stack
//     });
                
                
//     }
    
//   };
// };

// export default valdition