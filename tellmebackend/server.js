import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/dbconnect.js';
import autoRout from './route/route.js'
const app=express()
dotenv.config()
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow your front-end origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
}));
app.use(express.urlencoded({extended:true}))
app.use('/tellme',autoRout);
const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`)
})