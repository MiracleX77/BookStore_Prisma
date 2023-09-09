import type {Request,Response,Application} from 'express';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import baseRoute from './routes/baseRoute'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';



import dotenv from 'dotenv';
dotenv.config();



const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);
app.use('/api',baseRoute);



const swaggerDocs = YAML.load('./swagger.yaml');

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

const port = process.env.PORT;
app.listen(port,()=>console.log(`Server is running on port ${port}`));