import type {Request,Response,Application} from 'express';
import express from 'express';
import {PrismaClient} from '@prisma/client';

const app : Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello World")
});

app.listen(3000,()=>{
    console.log("server start")
})


