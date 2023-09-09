import {Request,Response} from 'express';
import * as transactionModel from '../models/transactionModel'; 
import * as rentalModel from '../models/rentalModel';
import * as imgModel from '../models/imgModel';
import { RentalInterface ,TransactionInterface,TransactionResponseInterface} from '../interfaces/transactionInterface';
import { responser } from '../services/responseService';

export const createTransaction = async (req:Request,res:Response) =>{
    const {product_id,size,date_rental_start,date_rental_stop,cost,user_id} = req.body;
    
    if(!product_id || !size || !date_rental_start || !date_rental_stop || !cost ||!user_id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    try{
        const date_start = new Date(date_rental_start);
        const date_return = new Date(date_rental_stop);

        const dataRental:RentalInterface={
            date_rent : date_start,
            date_return : date_return,
            total_cost : parseFloat(cost),
        
        }
        const rental = await rentalModel.create(dataRental)
        
        const dataTransaction:TransactionInterface = {
            product_id : product_id,
            rental_id : rental.id,
            cost :  parseFloat(cost),
            size : size,
            user_id : user_id,
            status : "pending"
        }
        const transaction = await transactionModel.create(dataTransaction);

        const response = responser(true,"Create transaction success");
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : 002");
        return res.status(500).json(response);
    }
}
export const getTransaction = async (req:Request,res:Response) =>{
    const {id} = req.params;
    try{
        const transaction = await transactionModel.find(parseInt(id));
        if(!transaction){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }

        const img = await imgModel.find(parseInt(transaction.product.img));
        if(!img){
            const response = responser(false,"Image not found");
            return res.status(404).json(response);
        }
        transaction.product.img = img.img_url_s;
        if(transaction.img_product?.img_before_id && transaction.img_product?.img_after_id){
            const img_before = await imgModel.find(transaction.img_product?.img_before_id);
            if(!img_before){
                const response = responser(false,"Image not found");
                return res.status(404).json(response);
            }
            const img_after = await imgModel.find(transaction.img_product?.img_after_id);
            if(!img_after){
                const response = responser(false,"Image not found");
                return res.status(404).json(response);
            }
            transaction.img_product.img_before_s = img_before.img_url_s;
            transaction.img_product.img_before_m = img_before.img_url_m;
            transaction.img_product.img_before_l = img_before.img_url_l;
            transaction.img_product.img_after_s = img_after.img_url_s;
            transaction.img_product.img_after_m = img_after.img_url_m;
            transaction.img_product.img_after_l = img_after.img_url_l;
        }
        transaction.create_at?.setHours(transaction.create_at.getHours() + 7);

        const responseData:TransactionResponseInterface = transaction;

        const response = responser(true,"Get transaction success",responseData);
        return res.json(response);

    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : 002");
        return res.status(500).json(response);
    }
}
export const getTransactionByUser = async (req:Request,res:Response) =>{
    const {user_id} = req.params;
    try{
        const transaction = await transactionModel.findByUser(parseInt(user_id));
        if(!transaction){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }
        const responseData:TransactionResponseInterface[] = [];
        for(let i = 0 ; i < transaction.length ; i++){

            const img = await imgModel.find(parseInt(transaction[i].product.img));
            if(!img){
                const response = responser(false,"Image not found");
                return res.status(404).json(response);
            }
            
            transaction[i].product.img = img.img_url_s;
            const img_product_before_id = transaction[i].img_product?.img_before_id
            const img_product_after_id = transaction[i].img_product?.img_after_id
            if (img_product_before_id && img_product_after_id) {
                const img_before = await imgModel.find(img_product_before_id); // นี่คือการเข้าถึง id โดยไม่ใช้ optional chaining
                if (!img_before) {
                    const response = responser(false, "Image not found");
                    return res.status(404).json(response);
                }
                const img_after = await imgModel.find(img_product_after_id);
                if(!img_after){
                    const response = responser(false,"Image not found");
                    return res.status(404).json(response);
                }
                transaction[i].img_product.img_before_s = img_before.img_url_s;
                transaction[i].img_product.img_before_m = img_before.img_url_m;
                transaction[i].img_product.img_before_l = img_before.img_url_l;
                transaction[i].img_product.img_after_s = img_after.img_url_s;
                transaction[i].img_product.img_after_m = img_after.img_url_m;
                transaction[i].img_product.img_after_l = img_after.img_url_l;

            }
            transaction[i].create_at?.setHours(transaction[i].create_at.getHours() + 7);

            responseData.push(transaction[i]);
        }
        const response = responser(true,"Get transaction success",responseData);
        return res.json(response);

    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : 002");
        return res.status(500).json(response);
    }
}
export const getTransactionByOrder = async (req:Request,res:Response) =>{
    const {order_id} = req.params;
    try{
        const transaction = await transactionModel.findByOrder(order_id);
        if(!transaction){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }
        const responseData:TransactionResponseInterface[] = [];
        for(let i = 0 ; i < transaction.length ; i++){
            const img = await imgModel.find(parseInt(transaction[i].product.img));
            if(!img){
                const response = responser(false,"Image not found");
                return res.status(404).json(response);
            }
            
            transaction[i].product.img = img.img_url_s;
            const img_product_before_id = transaction[i].img_product?.img_before_id
            const img_product_after_id = transaction[i].img_product?.img_after_id
            if (img_product_before_id && img_product_after_id) {
                const img_before = await imgModel.find(img_product_before_id); // นี่คือการเข้าถึง id โดยไม่ใช้ optional chaining
                if (!img_before) {
                    const response = responser(false, "Image not found");
                    return res.status(404).json(response);
                }
                const img_after = await imgModel.find(img_product_after_id);
                if(!img_after){
                    const response = responser(false,"Image not found");
                    return res.status(404).json(response);
                }
                transaction[i].img_product.img_before_s = img_before.img_url_s;
                transaction[i].img_product.img_before_m = img_before.img_url_m;
                transaction[i].img_product.img_before_l = img_before.img_url_l;
                transaction[i].img_product.img_after_s = img_after.img_url_s;
                transaction[i].img_product.img_after_m = img_after.img_url_m;
                transaction[i].img_product.img_after_l = img_after.img_url_l;
            }
            transaction[i].create_at?.setHours(transaction[i].create_at.getHours() + 7);

            responseData.push(transaction[i]);
        }
        const response = responser(true,"Get transaction success",responseData);
        return res.json(response);

    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : 002");
        return res.status(500).json(response);
    }
}