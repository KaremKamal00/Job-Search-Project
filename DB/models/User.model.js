import mongoose, { Schema,model } from "mongoose";



const userSchema=new Schema({

firstName:{
        type:String,
        required:[true,'firstName Required'],
        min:[2,'Minimum length'],
        max:[20,'Maximum length'],
        lowerCase:true
},

lastName:{
    type:String,
    required:[true,'lastName Required'],
    min:[2,'Minimum length'],
    max:[20,'Maximum length'],
    lowerCase:true
},
    
userName:{
    type:String,
    min:[2,'Minimum length'],
    max:[20,'Maximum length'],
    lowerCase:true
},
password:{
    type:String,
    required:[true,'Password Required']
},
email:{
    type:String,
    unique:true,
    required:[true,'email Required'],
    lowerCase:true
},
role:{
    type:String,
    enum:['User','Company_HR'],
    default:'User'
},

status:{
    type:String,
    enum:['Offline','Online'],
    default:'Offline'
},

confirmEmail:{
    type:Boolean,
    default:false
},

recoveryEmail:{
    type:String,
    lowerCase:true
},

mobileNumber :{
    type:String,
    unique:true,
},
isDeleted:{
    type:Boolean,
    default:false
},

code:String,
DOB:String,

},
{
    timestamps:true
})

userSchema.pre('save', function (next) {
    // Generate the username by concatenating firstName and lastName
    this.userName = `${this.firstName}${this.lastName}`.toLowerCase();
    next();
});

// mongoose.model.userModel||
const userModel=model("User",userSchema)

export default userModel