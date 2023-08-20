import {Request,Response} from 'express';
import {AddressInterface} from '../interfaces/addressInterface';
import {create} from '../models/addressModel';

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
            const address = await create(addressData);
            return res.json(address)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({msg:'ERR : 001'});
        }
    }
}