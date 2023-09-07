import type {Request,Response,Application} from 'express';
import express from 'express';
//import {PrismaClient,Prisma} from '@prisma/client';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'



import dotenv from 'dotenv';
dotenv.config();



const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));
app.get("/",(req,res)=>{
    res.send('thissssssssssssss')
})
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);




const port = process.env.PORT;
app.listen(port,()=>console.log(`Server is running on port ${port}`));