import multer from 'multer'

export const filevalidtion={
image:['image/png','image/jpeg','image/gif'],
pdf:['application/pdf']
}

const uploadFileCloud=({customValidtion}={})=>{

    const storage=multer.diskStorage({
       

    })
        const fileFilter=(req,file,cb)=>{
            if(customValidtion.includes(file.mimetype)){
                cb(null,true);
            }
            else{
                cb(new Error("Invalid Format"),false);
            }
        }

    const upload=multer({fileFilter,storage})
    return upload
}

export default uploadFileCloud