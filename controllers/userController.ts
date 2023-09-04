import {Request,Response} from 'express';
import {UserInsertInterface,UserUpdateInterface} from '../interfaces/userInterface';
import { responser } from '../services/responseService';
import * as userModel  from '../models/userModel';



//User

export const getUser = async (req:Request,res:Response) =>{
    const id  = Number(req.params.id);
    if(!id){
        const response = responser(false,"Please enter all fields");
        return res.status(400).json(response);
    }
    else{
        try{
            const user = await userModel.findByID(id);
            const response = responser(true,"Get user success",user);
            return res.json(response);
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Get user fail");
            return res.status(500).json(response);
        }
    }
}
export const getAllUser = async (req:Request,res:Response) =>{
    try{
        const user = await userModel.findAll();
        const response = responser(true,"Get user success",user);
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Get user fail");
        return res.status(500).json(response);
    }
}
export const updateUser = async (req:Request,res:Response) =>{
    const id  = Number(req.params.id);
    const {name,surname,phone,email,update_by} = req.body;
    if(!name || !surname || !phone || !email){
        const response = responser(false,"Please enter all fields");
        return res.status(400).json(response);
    }
    else{
        try{
            const userData:UserUpdateInterface = {
                name:name,
                surname:surname,
                phone:phone,
                email:email,
                update_by:update_by
            }
            const user = await userModel.update(id,userData);
            const response = responser(true,"Update user success",user);
            return res.json(response);
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Update user fail");
            return res.status(500).json(response);
        }
    }
}
export const removeUser = async (req:Request,res:Response) =>{
    const id  = Number(req.params.id);
    if(!id){
        const response = responser(false,"Please enter all fields");
        return res.status(400).json(response);
    }
    else{
        try{

            const user = await userModel.remove(id);
            const response = responser(true,"Remove user success",user);
            return res.json(response);
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Remove user fail");
            return res.status(500).json(response);
        }
    }
}

