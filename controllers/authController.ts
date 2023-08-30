import {Request,Response,NextFunction} from 'express';
import {UserInsertInterface,AdminInsertInterface} from '../interfaces/userInterface';
import * as userModel from '../models/userModel';
import * as adminModel from '../models/adminModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async (req:Request, res:Response) =>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({message:'All fields are required'});
        return;
    }
    else{
        try{
            const user = await userModel.find('username',username);
            const admin = await adminModel.find('username',username);
            if(user === null && admin === null){
                res.status(401).json({message:'Username does not exist'});
                return;
            }
            else{
                if(user !== null){

                    const check = await bcrypt.compare(password ,user.password);
                    if(check){
                        const userName = user.username;
                        const secret = process.env.JWT_SECRET;
                        if(!secret){
                            res.status(500).json({message:'ERR : 001'});
                            return;
                        }
                        else{
                            const token = generateAccessToken(userName,'user');
                            return res.json({token})
                        }
                    }
                    else{
                        res.status(403).json({message:'Password is incorrect'});
                        return;
                    }
                }
                if(admin !== null){
                    const check = await bcrypt.compare(password ,admin.password);
                    if(check){
                        const userName = admin.username;
                        const secret = process.env.JWT_SECRET;
                        if(!secret){
                            res.status(500).json({message:'ERR : 001'});
                            return;
                        }
                        else{
                            const token = generateAccessToken(userName,'admin');
                            return res.json({token})
                        }
                    }
                    else{
                        res.status(403).json({message:'Password is incorrect'});
                        return;
                    }
                }
            }
        }
        catch(e){
            console.log(e)
            res.status(500).json({message:'ERR : 002'});
            return;
        }
    }
}

export const register = async (req:Request, res:Response , ) =>{
    const {username,password,name,surname,phone,email,address,role,id_card,type} = req.body;
    if(!type){
        res.status(400).json({message:'Invalid type'});
        return;
    }
    if(type !== 'admin' && type !== 'user'){
        res.status(400).json({message:'Invalid type'});
        return;
    }
    if(type === 'admin'){
        if(!username || !password || !name ||!surname || !phone || !email || !address || !role || !id_card){
            res.status(400).json({message:'All fields are required'});
            return;
        }else{
            try{
                const hashedPassword = await bcrypt.hash(password,10);
                const admin = await adminModel.find('username',username);
                if(admin !== null){
                    res.status(400).json({message:'Username already exists'});
                    return;
                }
                const user = await userModel.find('username',username);
                if(user !== null){
                    res.status(400).json({message:'Username already exists'});
                    return;
                }
                    else{
                    const hashedPassword = await bcrypt.hash(password,10);
                    const adminData:AdminInsertInterface = {
                        username,
                        password:hashedPassword,
                        name,
                        surname,
                        phone,
                        email,
                        address,
                        role,
                        id_card
                    };
                    try{
                        const user = await adminModel.create(adminData);
                        res.json(user);
                    }
                    catch(e){
                        res.json(e);
                    }
                }
            }
            catch (e){
                res.status(500).json({message:'ERR '});
                return;
            }
        }
    }
    if(type === 'user'){
        if(!username || !password || !name || !surname || !phone || !email ){
            res.status(400).json({message:'All fields are required'});
            return;
        }else{
            try{
                const hashedPassword = await bcrypt.hash(password,10);
                const user = await userModel.find('username',username);
                if(user !== null){
                    res.status(400).json({message:'Username already exists'});
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
                        res.json(user);
                    }
                    catch(e){
                        res.json(e);
                    }
                }
            }
            catch (e){
                res.status(500).json({message:'ERR '});
                return;
            }
        }
    }

}

export const authenticateToken  = ( req:Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization'];
    if(authHeader === undefined){
        res.status(401).json({message:'Token not found'});
        return;
    }
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null){
        res.status(401).json({message:'Token not found'});
        return;
    }
    else{
        const secret = process.env.JWT_SECRET;
        if(secret && token){
            jwt.verify(token,secret,(err:any,user:any)=>{
                if(err){
                    res.status(403).json({message:'Token is invalid'});
                    return;
                }
                req.body.user = user;
                console.log(user)
                next();
            })
        }
    }

}

function generateAccessToken(username : string,type:string) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = '1h';
    const algorithm = 'HS256';
    if(!secret){
        return;
    }
    else{
        return jwt.sign({username,type}, secret, { expiresIn ,algorithm});
    }
}