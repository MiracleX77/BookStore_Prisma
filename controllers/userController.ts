import {Request,Response} from 'express';
import {UserInsertInterface,UserResponseInterface,UserUpdateInterface,AdminInsertInterface} from '../interfaces/userInterface';
import { responser } from '../services/responseService';
import * as userModel  from '../models/userModel';
import * as adminModel from '../models/adminModel';
import {AddressInterface} from '../interfaces/addressInterface';
import * as addressModel from '../models/addressModel';
import bcrypt from 'bcryptjs';
import { create } from 'domain';



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
            if(user === null){
                const response = responser(false,"User not found");
                return res.status(400).json(response);
            }
            user.create_at.setHours(user.create_at.getHours() + 7);
            user.update_at.setHours(user.update_at.getHours() + 7);
            const userResponse:UserResponseInterface = {
                id:user.id,
                username:user.username,
                name:user.name,
                surname:user.surname,
                phone:user.phone,
                email:user.email,
                createdAt:user.create_at,
                updatedAt:user.update_at,
                update_by:user.update_by,
                status:user.status
            }
            const response = responser(true,"Get user success",userResponse);
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
        if(user === null){
            const response = responser(false,"User not found");
            return res.status(400).json(response);
        }
        const userResponse:UserResponseInterface[] = [];
        user.forEach((element) => {
            element.create_at.setHours(element.create_at.getHours() + 7);
            element.update_at.setHours(element.update_at.getHours() + 7);
            const userResponseData:UserResponseInterface = {
                id:element.id,
                username:element.username,
                name:element.name,
                surname:element.surname,
                phone:element.phone,
                email:element.email,
                createdAt:element.create_at,
                updatedAt:element.update_at,
                update_by:element.update_by,
                status:element.status
            }
            userResponse.push(userResponseData);
        });


        const response = responser(true,"Get user success",userResponse);
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
            const response = responser(true,"Update user success");
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
            const response = responser(true,"Remove user success");
            return res.json(response);
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Remove user fail");
            return res.status(500).json(response);
        }
    }
}

//Admin
export const createAdmin = async (req:Request,res:Response) =>{
    const {username,password,name,surname,phone,email,address_line,sub_district_id,district_id,province_id,role,id_card} = req.body;
    if(!username || !password || !name ||!surname || !phone || !email || !address_line || !role || !id_card || !sub_district_id || !district_id || !province_id){
        const response = responser(false,"All fields are required");
        res.status(400).json(response);
        return;
    }
        try{
            const hashedPassword = await bcrypt.hash(password,10);
            const admin = await adminModel.find('username',username);
            if(admin !== null){
                const response = responser(false,"Username already exists");
                res.status(400).json(response);
                return;
            }
            const user = await userModel.find('username',username);
            if(user !== null){
                const response = responser(false,"Username already exists");
                res.status(400).json(response);
                return;
            }
                else{
                const hashedPassword = await bcrypt.hash(password,10);

                try{
                    const adminData:AdminInsertInterface = {
                        username,
                        password:hashedPassword,
                        name,
                        surname,
                        phone,
                        email,
                        role,
                        id_card
                    };
                    const user = await adminModel.create(adminData);
                    const addressData:AddressInterface = {
                        user_id:user.id,
                        address_line,
                        sub_district_id,
                        district_id,
                        province_id
                    }
                    const address = await addressModel.create(addressData);

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

