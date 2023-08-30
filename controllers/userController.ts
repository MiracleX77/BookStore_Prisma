import {Request,Response} from 'express';
import {AddressInterface} from '../interfaces/addressInterface';
import {UserInsertInterface,UserUpdateInterface} from '../interfaces/userInterface';
import * as addressModel from '../models/addressModel';
import * as userModel  from '../models/userModel';



//User

export const getUser = async (req:Request,res:Response) =>{
    const id  = Number(req.params.id);
    if(!id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        try{
            const user = await userModel.findByID(id);
            return res.json(user);
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
        }
    }
}
export const getAllUser = async (req:Request,res:Response) =>{
    try{
        const user = await userModel.findAll();
        return res.json(user);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({msg:'ERR : 001'});
    }
}
export const updateUser = async (req:Request,res:Response) =>{
    const id  = Number(req.params.id);
    const {name,surname,phone,email,update_by} = req.body;
    if(!name || !surname || !phone || !email){
        return res.status(400).json({msg:'Please enter all fields'});
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
            return res.json(user);
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
        }
    }
}
export const removeUser = async (req:Request,res:Response) =>{
    const id  = Number(req.params.id);
    if(!id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        try{
            const user = await userModel.remove(id);
            return res.json(user);
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
        }
    }
}




//Address
export const getAllAddress = async (req:Request,res:Response) =>{
    const user_id = Number(req.params.user_id);
    if(!user_id){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    else{
        try{
            const address = await addressModel.findMany(user_id);
            return res.json(address)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
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
            return res.json(address)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
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
            return res.json(address)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
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
            return res.json(address)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
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
            return res.json(address)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
        }
    }
}
