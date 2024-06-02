import joi from "joi";
import { Types } from "mongoose";
export const idValidition=(value,helper)=>{
       return Types.ObjectId.isValid(value)?true:helper.message("Invaild Id")
     }

const generalFields={

    email:joi.string().email({ tlds: { allow: ['com','net'] } }),
    id:joi.string().custom(idValidition).required(),
    _id:joi.string().custom(idValidition),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
    authorization:joi.string().required(),
    userName:joi.string().min(3).max(15).required(),

    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
    }),
    
    files:joi.array().items(
        
        joi.object({
            size:joi.number().positive().required(),
            path:joi.string().required(),
            filename:joi.string().required(),
            destination:joi.string().required(),
            mimetype:joi.string().required(),
            encoding:joi.string().required(),
            orignalname:joi.string().required(),
            fieldname:joi.string().required(),
            finalDest:joi.string().required(),
        })
    ).required()
    
}

export default generalFields