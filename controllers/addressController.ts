import {Request,Response} from 'express';
import {AddressInterface} from '../interfaces/addressInterface';
import { responser } from '../services/responseService';
import * as addressModel from '../models/addressModel';




//Address
export const getAllAddress = async (req:Request,res:Response) =>{
    const user_id = Number(req.params.user_id);
    if(!user_id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        try{
            const address = await addressModel.findMany(user_id);

            const response = responser(true,"Get address success",address);
            return res.json(response)
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Get address fail");
            return res.status(500).json(response);
        }
    }
}
export const getAddress = async (req:Request,res:Response) =>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        try{
            const address = await addressModel.find(id);
            
            const response = responser(true,"Get address success",address);
            return res.json(response)
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Get address fail");
            return res.status(500).json(response);
        }
    }
}
export const insertAddress = async (req:Request,res:Response) =>{
    
    const {user_id,address_line,sub_district_id,district_id,province_id} = req.body;
    
    if(!user_id || !sub_district_id || !district_id || !province_id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        const addressData:AddressInterface = {
            user_id:user_id,
            address_line:address_line,
            sub_district_id:sub_district_id,
            district_id:district_id,
            province_id:province_id
        }
        try{
            const address = await addressModel.create(addressData);
            const response = responser(true,"Create address success");
            return res.json(response)
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Create address fail");
            return res.status(500).json(response);
        }
    }
}
export const updateAddress = async (req:Request,res:Response) =>{
    const id = Number(req.params.id);
    const {user_id,address_line,sub_district_id,district_id,province_id} = req.body;
    if(!sub_district_id || !district_id || !province_id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        const addressData:AddressInterface = {
            user_id:user_id,
            address_line:address_line,
            sub_district_id:sub_district_id,
            district_id:district_id,
            province_id:province_id
        }
        try{
            const address = await addressModel.update(id,addressData);
            const response = responser(true,"Update address success");
            return res.json(response)
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Update address fail");
            return res.status(500).json(response);
        }
    }
}
export const removeAddress = async (req:Request,res:Response) =>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        try{
            const address = await addressModel.remove(id);
            const response = responser(true,"Remove address success");
            return res.json(response)
        }
        catch(e){
            console.log(e);
            const response = responser(false,"ERR : Remove address fail");
            return res.status(500).json(response);
        }
    }
}
