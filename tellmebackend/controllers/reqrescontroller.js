import {User,UserData} from "../models/User.models.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendVerification } from "../mailtrapconfig/email.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenCookie.js";
export const signup=async(req,res)=>{
    const {user_name,password,email}=req.body;
try
{
    if(!user_name||!password||!email){
        throw new Error("All fields are required");
    }
    const alreadyExist =await User.findOne({email});
    if(alreadyExist){
        throw new Error("The email is already exist");
    }
    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword=await bcrypt.hash(password,10);
    const user =new User({
        user_name,
        email,
        password:hashedPassword,
        verificationToken,
        verificationExpire:Date.now() + 24*60*60*1000
    });
    await user.save();
    generateTokenAndSetCookie(res,user._id);
    await sendVerification(user.email,verificationToken);
    res.status(201).json({message:"we have sent an email to verify your account check it !"})
}catch(error){
    res.status(400).json({message:error.message})
}
}
export const verifyUser = async (req, res) => {
    const { code } = req.body;
    try {        
        const user = await User.findOne({
            verificationToken: code,
            verificationExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found or token expired" });
        }
        user.isVerified=true;
        user.verificationToken = undefined;
        user.verificationExpire = undefined;
        await user.save();

        res.status(200).send({ message: "User verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "There is no user with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Your email is not verified. Please verify your email." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.json({ token });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const auth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const fetchData = async (req, res) => {
    try {
        const userDiary = await UserData.find({ userId: req.user.id });
        res.status(200).json(userDiary);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const postText = async (req, res) => {
    const { text } = req.body; 

    const userData = new UserData({ text, userId: req.user.id });

    try {
        await userData.save();
        res.status(201).json(userData); 
    } catch (error) {
                res.status(500).json({ message: "Server error" });
    }
};
import mongoose from 'mongoose';
export const deleteDiary = async (req, res) => {
    const { diaryId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(diaryId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try {
        const deletedDiary = await UserData.findByIdAndDelete(diaryId);
        if (!deletedDiary) {
            return res.status(404).json({ message: "Diary not found" });
        }
        res.status(200).json({ message: "Diary deleted successfully" });
    } catch (error) {
        console.error("Error deleting diary:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const deleteAccount = async (req, res) => {
    const {password}=req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        await User.findByIdAndDelete(req.user.id);
        await UserData.deleteMany({ userId: req.user.id });
        res.status(200).json({ message: "Account deleted successfully" });
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
} 
export const changePassword=async(req,res)=>{
    const {password,newPassword}=req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        await user.save();
        res.status(200).json({message:"Password changed successfully"});

    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}
export const changeUserName=async(req,res)=>{
    const {name,password}=req.body;
    try {
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"});
        }
        user.user_name=name;
        await user.save();
        res.status(200).json({message:"Name changed successfully"});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}
export const forgetPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            throw new Error('There is no user in this email');
        }
        const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();
        user.password=verificationToken;
        await user.save();
        generateTokenAndSetCookie(res,user._id);
         await sendVerification(user.email,verificationToken);
         res.status(201).json({message:"we have sent an email to verify your account check it !"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
export const verifyDelete=async(req,res)=>{
    const {verificationCode,newPassword}=req.body;
    try {
        const user=await User.findOne({password:verificationCode});
        if(!user){
           throw new Error("Invalid Verification Code");
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        await user.save();
        res.status(200).json({message:"password is successfully resat login again"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
export const UserName=async(req,res)=>{
    const user=await User.findById(req.user.id);
    try {
        res.status(200).json({name:user.user_name});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}