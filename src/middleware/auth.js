import jwt from 'jsonwebtoken'
import userModel from '../../DB/models/User.model.js';


export const roles={
    User: "User",
    Company_HR:"Company_HR"

}

const auth=(role=Object.values(roles))=>{

    return async (req,res,next)=>{
        const { authorization } = req.headers;
        
        if(!authorization){
            return next (new Error("Please Login",{cause:400}))
        }
        if(!authorization?.startsWith(process.env.BEARER_TOKEN)){
            return next (new Error ("Invalid Bearer Token",{cause:404}))
        }
        const token=authorization.split(process.env.BEARER_TOKEN)[1]
        
        const payload=jwt.verify(token,process.env.TOKEN_SIGNATURE)
        
        if(!payload?._id){
            return next (new Error("Invalid payload",{cause:404}))
        }
    
        const user=await userModel.findOne({_id:payload._id}).select('userName email role status')
        if(!user){
            return next ( new Error("The User Doesn't Exist",{cause:404}))
        }

        if(user.status!='Online'){
            return next ( new Error("Invalid Token Please Login",{cause:404}))
        }

        if(!role.includes(user.role)){
            return next ( new Error("Not Authorized",{cause:401}))
        }
        req.user=user
        next()
    }
}

export default auth
