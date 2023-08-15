import type {Request,Response,Application} from 'express';
import express from 'express';
import {PrismaClient,Prisma} from '@prisma/client';

const app : Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/users',async (req:Request,res:Response)=>{
    try{
        const users = await prisma.user.findMany({
            include:{
                posts:{
                    select:{
                        title:true,
                        content:true,
                    }
                }
            }
        })
        res.json(users)

    } catch(e){
        console.error(e)
        res.sendStatus(500)
    }
});
app.post('/createUser',async (req:Request,res:Response)=>{
    try{
        const {data} : {
            data : {
                id : string,
                name : string,
                surname: string,
            }
        } = req.body;

        const post = await prisma.user.create({data})

        res.json(post)

    } catch(e){
        console.error(e)
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return res.status(400).json({error:"user have already exist"})
            }
        }
        res.sendStatus(500)
    }

});
app.post('/posts',async (req:Request,res:Response)=>{
    try{
        const {authorId,postData} : {
            authorId : string,
            postData : {
                title : string,
                content: string,
            }
        } = req.body;

        const post = await prisma.post.create({
            data:{
                ...postData,
                authorId: authorId
            }
        })

        res.json(post)

    } catch(e){
        console.error(e)
        res.sendStatus(500)
    }

});

app.get('/getposts/:id',async (req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const posts = await prisma.post.findMany({
            where:{
                
                authorId : id
            },       
        })
        res.json(posts)

    } catch(e){
        console.error(e)

        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return res.status(400).json({error:"user have already exist"})
            }
        }

        res.sendStatus(500)
    }

}
);


app.listen(3000,()=>{
    console.log("server start")
})


