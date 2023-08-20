import { insertAddress } from '../controllers/userController';
import express,{Router} from 'express';
import {authenticateToken} from '../controllers/authController';
//import {register,login} from '../controllers/authController';

const router : Router = express.Router();

router.post("/insertAddress",insertAddress)


export default router;