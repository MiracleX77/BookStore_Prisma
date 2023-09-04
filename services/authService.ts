// Purpose: To provide authentication services for the application.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

export function generateAccessToken(username : string,type:string) {
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