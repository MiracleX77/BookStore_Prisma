import express,{Router} from 'express';
import {register,login} from '../controllers/authController';
import {Path,GET,POST,PathParam,QueryParam} from "typescript-rest";

const router : Router = express.Router();

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Auth]
 *    description: Login to the applications
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *     200:
 *        description: Login success
 * 
 */
router.post("/login",login)
router.post("/register",register)


export default router;