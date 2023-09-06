import { responser } from '../services/responseService';
import {Request,Response} from 'express';
import {OrderInterface,PaymentInterface,DeliveryInterface,DeliveryUpdateInterface,OrderUpdateInterface} from '../interfaces/orderInterface';
import { RentalUpdateInterface } from 'interfaces/transactionInterface';
import {generateCode} from '../services/codeService'
import {uploadImage} from '../services/uploadImgService'
import * as imageModel from '../models/imgModel';
import * as deliveryModel from '../models/deliveryModel';
import * as paymentModel from '../models/paymentModel';
import * as addressModel from '../models/addressModel';
import * as rentalModel from '../models/rentalModel';
import * as orderModel from '../models/orderModel';
import * as stockModel from '../models/stockModel';
import * as transactionModel from '../models/transactionModel';




export const checkOrderOut = async (req:Request,res:Response) =>{
    const {user_id,list_transaction_id} = req.body;
    if(!user_id || !list_transaction_id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    try{
        const allStockAvailable =  true;
        for (const id of list_transaction_id) {
            const transaction = await transactionModel.find(id);
            if(!transaction){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
            const stock_count = await stockModel.count(transaction.product.id); 
            if(!stock_count){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
            if(stock_count.find((stock) => stock.size === transaction.size)?.count === 0){
                const response = responser(false,"Stock Product cannot be ordered",transaction.id);
                return res.status(400).json(response);
            }
        }
        if(allStockAvailable){
            const response = responser(true,"Stock Product can be ordered");
            return res.json(response);
        }
        else{
            const response = responser(false,"Stock Product cannot be ordered");
            return res.status(400).json(response);
        }
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : 002");
        return res.status(500).json(response);
    }
}
export const createOrder = async (req:Request,res:Response) =>{
    const {user_id,list_transaction_id,type_delivery,type_payment,contact_name,contact_phone,email,address_id,total_cost,shipping_company} = req.body;
    if(!user_id || !list_transaction_id || !type_delivery || !type_payment || !contact_name || !contact_phone || !email || !address_id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    if(!req.file){
        const response =  responser(false,"Please upload image");
        res.status(400).json(response);
        return;
    }
    const allowedType = ['image/png','image/jpg','image/jpeg'];
    if(!allowedType.includes(req.file.mimetype)){
        const response = responser(false,"Please upload image");
        res.status(400).json(response);
        return;
    }
    const imageName = user_id.replace(/\s/g,'-') + '-' + Date.now() + '.jpg';
    const imageBuffer = req.file.buffer;
    const pathImage =await uploadImage(imageBuffer,imageName);

    try{
        const count = await orderModel.countByUserId(user_id);
        const code = generateCode(user_id,count);

        const image = await imageModel.create(pathImage.smallImagePath,pathImage.mediumImagePath,pathImage.largeImagePath,"payment");
        if(!image){
            const response = responser(false,"Image not found");
            return res.status(404).json(response);
        }
        const paymentData:PaymentInterface = {
            type:type_payment,
            total_cost:parseFloat(total_cost),
            contact_name:contact_name,
            contact_phone:contact_phone,
            email:email,
            img_id:image.id
        }
        const payment = await paymentModel.create(paymentData);
        if(!payment){
            const response = responser(false,"Payment not found");
            return res.status(404).json(response);
        }
        const deliveryData:DeliveryInterface = {
            address_id:parseInt(address_id),
            delivery_type:shipping_company,
        }
        if(type_delivery === 'delivery'){
            const delivery = await deliveryModel.create(deliveryData);
            const delivery_id = delivery.id;
            const dataOrder:OrderInterface = {
                id:code,
                user_id:parseInt(user_id),
                delivery_id:delivery_id,
                payment_id:payment.id,
                type_delivery:type_delivery,
                total_cost:parseFloat(total_cost),
                status:"waiting"
                
            }
            const order = await orderModel.create(dataOrder);
            for (const id of list_transaction_id) {
                const status = 'order';
                const dataUpdate={
                    status:status,
                    order_id:order.id,
                }
                const transactionUpdate = await transactionModel.update(parseInt(id),dataUpdate);
                if(!transactionUpdate){
                    const response = responser(false,"Transaction not found");
                    return res.status(404).json(response);
                }
            }
        }
        else if(type_delivery === 'pickup'){
            const dataOrder:OrderInterface = {
                id:code,
                user_id:parseInt(user_id),
                payment_id:payment.id,
                type_delivery:type_delivery,
                total_cost:parseFloat(total_cost),
                status:"waiting"
            }
            const order = await orderModel.create(dataOrder);
            for (const id of list_transaction_id) {
                const status = 'order';
                const dataUpdate={
                    status:status,
                    order_id:order.id,
                }
                const transactionUpdate = await transactionModel.update(parseInt(id),dataUpdate);
                if(!transactionUpdate){
                    const response = responser(false,"Transaction not found");
                    return res.status(404).json(response);
                }
            }
        }
        

        const response = responser(true,"Create order success",{code});
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : 002");
        return res.status(500).json(response);
    }

}
export const getAllOrder = async (req:Request,res:Response) =>{
    try{
        const orders = await orderModel.findAll();
        const response = responser(true,"Get all order success",orders);
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Get all order fail");
        return res.status(500).json(response);
    }
}
export const getOrder = async (req:Request,res:Response) =>{
    const id = req.params.id;
    if(!id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    try{
        const order = await orderModel.find(id);
        if(!order){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(order.delivery !== undefined){
            const address_id = order.delivery.address_line;
            if(!address_id){
                const response = responser(false,"Address not found");
                return res.status(404).json(response);
            }
            const address = await addressModel.find(parseInt(address_id));
            if(!address){
                const response = responser(false,"Address not found");
                return res.status(404).json(response);
            }
            order.delivery.address_line = address.address_line;
            order.delivery.sub_district = {
                name_th:address.sub_district.name_th,
                name_en:address.sub_district.name_en
            }
            order.delivery.district = {
                name_th:address.district.name_th,
                name_en:address.district.name_en
            }
            order.delivery.province = {
                name_th:address.province.name_th,
                name_en:address.province.name_en
            }
            order.delivery.zip_code = address.zip_code;
        }
        order.create_at?.setHours(order.create_at.getHours() + 7);


        const response = responser(true,"Get order success",order);
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Get order fail");
        return res.status(500).json(response);
    }
}
export const verifyPaymentOrder = async (req:Request,res:Response) =>{
    const id = req.params.id;
    if(!id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    try{
        const order = await orderModel.find(id);
        if(!order){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(order.status !== 'waiting'){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const orderUpdate = await orderModel.updateStatus(id,"shipment");
        if(!orderUpdate){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const list_transaction = await transactionModel.findByOrder(id);
        if(!list_transaction){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }
        for (const transaction of list_transaction) {
            const status = 'shipment';
            const transactionUpdate = await transactionModel.updateStatus(transaction.id,status);
            if(!transactionUpdate){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
            const product_id = transactionUpdate.product_id;
            const size = transactionUpdate.size;
            const stock = await stockModel.findFilterOne(product_id,size,"active");
            if(!stock){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
            const stockUpdate = await stockModel.updateStatus(stock.id,status);
            if(!stockUpdate){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
        }
        const response = responser(true,"Verify order success");
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Verify order fail");
        return res.status(500).json(response);
    }
}
export const cancelPaymentOrder = async (req:Request,res:Response) =>{

    const id = req.params.id;
    if(!id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    try{
        const order = await orderModel.find(id);
        if(!order){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(order.status !== 'waiting'){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const orderUpdate = await orderModel.updateStatus(id,"cancel");
        if(!orderUpdate){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(order.payment.id !== undefined){
            const paymentUpdate = await paymentModel.updateStatus(order.payment.id,"cancel"); 
        }
        const list_transaction = await transactionModel.findByOrder(id);
        if(!list_transaction){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }
        for (const transaction of list_transaction) {
            const status = 'cancel';
            const transactionUpdate = await transactionModel.updateStatus(transaction.id,status);
            if(!transactionUpdate){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
        }
        const response = responser(true,"Cancel order success");
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Cancel order fail");
        return res.status(500).json(response);
    }
}
export const confirmShipmentOrder = async (req:Request,res:Response) =>{
    const id = req.params.id;
    const {tracking_number,list_id_transaction} = req.body;
    if(!id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    if(!req.files){
        const response =  responser(false,"Please upload image");
        res.status(400).json(response);
        return;
    }
    const allowedType = ['image/png','image/jpg','image/jpeg'];
    const images = req.files as Express.Multer.File[];
    for (const image of images) {
        if(!allowedType.includes(image.mimetype)){
            const response = responser(false,"Please upload image");
            res.status(400).json(response);
            return;
        }
    }
    try{
        const order = await orderModel.find(id);
        if(!order){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(order.status !== 'shipment'){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const orderUpdate = await orderModel.updateStatus(id,"delivery");
        if(!orderUpdate){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(list_id_transaction.length !== images.length){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }
        for (let i = 0 ; i < list_id_transaction.length ; i++) {
            const status = 'delivery';
            const transaction = await transactionModel.find(parseInt(list_id_transaction[i]));
            if(!transaction){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
            const transactionUpdate = await transactionModel.updateStatus(transaction.id,status);
            if(!transactionUpdate){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
            const product_id = transactionUpdate.product_id;
            const size = transactionUpdate.size;
            const stock = await stockModel.findFilterOne(product_id,size,"shipment");
            if(!stock){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
            const stockUpdate = await stockModel.updateStatus(stock.id,status);
            if(!stockUpdate){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
            const imageBuffer = images[i].buffer;
            const imageName = transactionUpdate.id + '-' +'before'+'-'+ Date.now() + '.jpg';
            const pathImage =await uploadImage(imageBuffer,imageName);
            const image = await imageModel.create(pathImage.smallImagePath,pathImage.mediumImagePath,pathImage.largeImagePath,"before");
            if(!image){
                const response = responser(false,"Image not found");
                return res.status(404).json(response);
            }
            const transactionUpdateImage = await transactionModel.updateBefore(transactionUpdate.id,image.id);
            if(!transactionUpdateImage){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }


        }
        const delivery_id = order.delivery?.id;
            if(delivery_id){

                const dataDelivery:DeliveryUpdateInterface ={
                    status:"delivery",
                    tracking_number:tracking_number,
                    date_start:new Date()
                }
                const deliveryUpdate = await deliveryModel.update(delivery_id,dataDelivery);
            }
            const response = responser(true,"Confirm shipment order success");
            return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Confirm shipment order fail");
        return res.status(500).json(response);
    }
}

export const receiveUserOrder = async (req:Request,res:Response) =>{
    const id = req.params.id;
    if(!id){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }

    try{
        const order = await orderModel.find(id);
        if(!order){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        if(order.status !== 'delivery'){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const orderUpdate = await orderModel.updateStatus(id,"rental");
        if(!orderUpdate){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const list_transaction = await transactionModel.findByOrder(id);
        for (let i = 0 ; i < list_transaction.length ; i++) {
            const status = 'rental';

            const transactionUpdate = await transactionModel.updateStatus(list_transaction[i].id,status);
            if(!transactionUpdate){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
            const rentalData:RentalUpdateInterface = {
                date_user_receive:new Date(),
                status:status
            }
            const rentalUpdate = await rentalModel.update(transactionUpdate.rental_id,rentalData);

            const product_id = transactionUpdate.product_id;
            const size = transactionUpdate.size;
            const stock = await stockModel.findFilterOne(product_id,size,"delivery");
            if(!stock){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
            const stockUpdate = await stockModel.updateStatus(stock.id,status);
            if(!stockUpdate){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
        }
        const delivery_id = order.delivery?.id;
        if(delivery_id){
            const dataDelivery:DeliveryUpdateInterface ={
                status:"received",
                date_end:new Date()
            }
            const deliveryUpdate = await deliveryModel.update(delivery_id,dataDelivery);
        }
        const response = responser(true,"Receive order success");
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Receive order fail");
        return res.status(500).json(response);
    }
}
export const returnOrder = async (req:Request,res:Response) =>{
    const {id,tracking_number,shipping_company} = req.body;
    if(!id || !tracking_number){
        const response = responser(false,"All fields are required");
        return res.status(400).json(response);
    }
    try{
        const list_transaction = await transactionModel.findByOrder(id);
        if(!list_transaction){
            const response = responser(false,"Transaction not found");
            return res.status(404).json(response);
        }
        for (const transaction of list_transaction) {
            const status = 'return';
            const transactionUpdate = await transactionModel.updateStatus(transaction.id,status);
            if(!transactionUpdate){
                const response = responser(false,"Transaction not found");
                return res.status(404).json(response);
            }
            const product_id = transactionUpdate.product_id;
            const size = transactionUpdate.size;
            const stock = await stockModel.findFilterOne(product_id,size,"rental");
            if(!stock){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
            const stockUpdate = await stockModel.updateStatus(stock.id,status);
            if(!stockUpdate){
                const response = responser(false,"Stock not found");
                return res.status(404).json(response);
            }
        }
        const orderUpdate = await orderModel.updateStatus(id,"return");
        if(!orderUpdate){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const deliveryData:DeliveryInterface ={
            delivery_type:shipping_company,
            tracking_number:tracking_number,
            date_start:new Date(),
        }
        const delivery = await deliveryModel.create(deliveryData);
        if(!delivery){
            const response = responser(false,"Delivery not found");
            return res.status(404).json(response);
        }
        const orderData:OrderUpdateInterface = {
            delivery_return_id:delivery.id,
        }
        const orderUpdateDelivery = await orderModel.update(id,orderData);
        if(!orderUpdateDelivery){
            const response = responser(false,"Order not found");
            return res.status(404).json(response);
        }
        const response = responser(true,"Return order success");
        return res.json(response);
    }
    catch(e){
        console.log(e);
        const response = responser(false,"ERR : Return order fail");
        return res.status(500).json(response);
    }

}

