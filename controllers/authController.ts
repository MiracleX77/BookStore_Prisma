import {Request,Response,NextFunction} from 'express';
import {UserInsertInterface,AdminInsertInterface} from '../interfaces/userInterface';
import { responser } from '../services/responseService';
import {generateAccessToken} from '../services/authService';
import * as userModel from '../models/userModel';
import * as adminModel from '../models/adminModel';
import bcrypt from 'bcryptjs';
import {Path,GET,POST,PathParam,QueryParam} from "typescript-rest";


export const login = async (req:Request, res:Response) =>{
    const {username,password} = req.body;
    if(!username || !password){
        const response = responser(false,"All fields are required");
        res.status(400).json(response);
        return;
    }
    else{
        try{
            const user = await userModel.find('username',username);
            const admin = await adminModel.find('username',username);
            if(user === null && admin === null){
                const response = responser(false,"Username does not exist");
                res.status(401).json(response);
                return;
            }
            else{
                if(user !== null){

                    const check = await bcrypt.compare(password ,user.password);
                    if(check){
                        const userName = user.username;
                        const secret = process.env.JWT_SECRET;
                        if(!secret){
                            const response = responser(false,"ERR : 001");
                            res.status(500).json(response);
                            return;
                        }
                        else{
                            const token = generateAccessToken(userName,'user');
                            const response = responser(true,"Login success",{token});
                            return res.json(response)
                        }
                    }
                    else{
                        const response = responser(false,"Password is incorrect");
                        res.status(403).json(response);
                        return;
                    }
                }
                if(admin !== null){
                    const check = await bcrypt.compare(password ,admin.password);
                    if(check){
                        const userName = admin.username;
                        const secret = process.env.JWT_SECRET;
                        if(!secret){
                            const response = responser(false,"ERR : 001");
                            res.status(500).json(response);
                            return;
                        }
                        else{
                            const token = generateAccessToken(userName,'admin');
                            const response = responser(true,"Login success",{token});
                            return res.json(response)
                        }
                    }
                    else{
                        const response = responser(false,"Password is incorrect");
                        res.status(403).json(response);
                        return;
                    }
                }
            }
        }
        catch(e){
            console.log(e)
            const response = responser(false,"ERR : 002");
            res.status(500).json(response);
            return;
        }
    }
}

export const register = async (req:Request, res:Response , ) =>{
    const {username,password,name,surname,phone,email} = req.body;
        if(!username || !password || !name || !surname || !phone || !email ){
            const response = responser(false,"All fields are required");
            res.status(400).json(response);
            return;
        }else{
            try{
                const hashedPassword = await bcrypt.hash(password,10);
                const user = await userModel.find('username',username);
                if(user !== null){
                    const response = responser(false,"Username already exists");
                    res.status(400).json(response);
                    return;
                }
                    else{
                    const hashedPassword = await bcrypt.hash(password,10);
                    const userData:UserInsertInterface = {
                        username,
                        password:hashedPassword,
                        name,
                        surname,
                        phone,
                        email,
                        status: 'active'
                    };
                    try{

                        const user = await userModel.create(userData);
                        const response = responser(true,"Register success");
                        res.json(response);
                    }
                    catch(e){
                        const response = responser(false,"ERR : 002");
                        res.json(response);
                    }
                }
            }
            catch (e){

                console.log(e)

                const response = responser(false,"ERR : 002");
                res.status(500).json(response);
                return;
            }
        }
    }


