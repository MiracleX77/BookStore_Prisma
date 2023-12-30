import type {Request,Response,Application} from 'express';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import baseRoute from './routes/baseRoute'
import YAML from 'yamljs';
import {createGenerator} from 'ts-json-schema-generator';
import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app : Application = express();
const port = process.env.PORT;

const SwaggerOptions ={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"BookStore API.",
            description : "BookStore API Information",
            contact:{
                name:"Amazing Developer"
            },
            version: "1.0.1"
        },
        servers:[
            {
                url:"http://localhost:8080/api"
            }
        ],
    },
    apis:["./routes/*.ts"]
};

const swaggerDocs = swaggerJSDoc(SwaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));
app.use('/api/auth',authRoute);
//app.use('/api/user',userRoute);
//app.use('/api/admin',adminRoute);
//app.use('/api',baseRoute);




app.listen(port,()=>console.log(`Server is running on port ${port}`));