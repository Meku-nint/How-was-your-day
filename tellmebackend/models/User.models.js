import mongoose, { mongo } from "mongoose";
const userSchema =new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken: String,
    verificationExpire: Date
},{timestamps:true})
export const User=mongoose.model('User',userSchema);

const userDataSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true});

export const UserData = mongoose.model('UserData', userDataSchema);
