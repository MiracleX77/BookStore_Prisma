import {Request,Response} from 'express';
import {UserData} from '../interfaces/userData';
import {create,find} from '../models/authModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {expressjwt} from 'express-jwt';
import { checkPrime } from 'crypto';


export const login = async (req:Request, res:Response) =>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({message:'All fields are required'});
        return;
    }
    else{
        try{
            const user = await find('username',username);
            if(user === null){
                res.status(401).json({message:'Username does not exist'});
                return;
            }
            else{
                const check = await bcrypt.compare(password ,user.password);
                if(check){
                    const userName = user.username;
                    const secret = process.env.JWT_SECRET;
                    if(!secret){
                        res.status(500).json({message:'ERR'});
                        return;
                    }
                    else{
                        const token = jwt.sign(userName,secret,{expiresIn:'1d'});
                    }
                    return res.json({secret})
                }
                else{
                    res.status(403).json({message:'Password is incorrect'});
                    return;
                }
            }
        }
        catch(e){
            res.status(500).json({message:'ERR'});
            return;
        }
    }
}

export const register = async (req:Request, res:Response) =>{
    const {username,password,name,surname,phone,email} = req.body;
    if(!username || !password || !name || !surname || !phone || !email){
        res.status(400).json({message:'All fields are required'});
        return;
    }else{
        try{
            const hashedPassword = await bcrypt.hash(password,10);
            console.log(hashedPassword)
            const user = await find('username',username);
            if(user !== null){
                res.status(400).json({message:'Username already exists'});
                return;
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10);
                const userData:UserData = {
                    username,
                    password:hashedPassword,
                    name,
                    surname,
                    phone,
                    email,
                    status: 'active'
                };
                try{
                    const user = await create(userData);
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

