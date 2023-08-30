import { Request, Response} from 'express';
import {ProductInterface,ResponseProductInterface} from '../interfaces/productInterface';
import * as costRentModel from '../models/costRentModel';
import * as productModel from '../models/productModel';
import * as imgModel from '../models/imgModel';
import * as stockModel from '../models/stockModel';
import sharp from 'sharp';


export const getAllProduct = async (req:Request,res:Response)=>{
    try{
        const products = await productModel.findAll();
        if(!products){
            res.status(404).json({message:'Product not found'});
            return;
        }
        const imgs = await imgModel.findAll();
        if(!imgs){
            res.status(404).json({message:'Image not found'});
            return;
        }

        const cost_rents = await costRentModel.findAll();
        if(!cost_rents){
            res.status(404).json({message:'Cost rent not found'});
            return;
        }

        const responseProducts:ResponseProductInterface[] = [];

        for(let i=0;i<products.length;i++){

            const sizeCount = await stockModel.count(products[i].id);

            const cost_base = cost_rents.find(cost_rent => cost_rent.product_id === products[i].id)?.cost_base;
            const cost_per_day = cost_rents.find(cost_rent => cost_rent.product_id === products[i].id)?.cost_per_day;
            const img_url_s = imgs.find(img => img.img_id === products[i].img_id)?.img_url_s;
            const img_url_m = imgs.find(img => img.img_id === products[i].img_id)?.img_url_m;
            const img_url_l = imgs.find(img => img.img_id === products[i].img_id)?.img_url_l;
            const responseProduct:ResponseProductInterface = {
                id:products[i].id,
                name:products[i].name,
                price:products[i].price,
                description:products[i].description,
                stock:sizeCount,
                img:{
                    img_url_s:img_url_s,
                    img_url_m:img_url_m,
                    img_url_l:img_url_l
                },
                cost_rent:{
                    cost_base:cost_base,
                    cost_per_day:cost_per_day
                },
                count_rent:products[i].count_rent,
                created_at:products[i].create_at,
                updated_at:products[i].update_at
            }
            responseProducts.push(responseProduct);
        }
        res.json(responseProducts);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'ERR : 001'});
    }
}

export const getProduct = async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    try{
        const product = await productModel.find(id);
        if(!product){
            res.status(404).json({message:'Product not found'});
            return;
        }
        const cost_rent = await costRentModel.find(id);
        if(!cost_rent){
            res.status(404).json({message:'Cost rent not found'});
            return;
        }
        if(!product.img_id){
            res.status(404).json({message:'Image not found'});
            return;
        }
        const img = await imgModel.find(product.img_id);
        if(!img){
            res.status(404).json({message:'Image not found'});
            return;
        }
        const sizeCount = await stockModel.count(product.id);
        const responseProduct:ResponseProductInterface = {
            id:product.id,
            name:product.name,
            price:product.price,
            description:product.description,
            stock:sizeCount,
            img:{
                img_url_s:img.img_url_s,
                img_url_m:img.img_url_m,
                img_url_l:img.img_url_l
            },
            cost_rent:{
                cost_base:cost_rent.cost_base ,
                cost_per_day:cost_rent.cost_per_day
            },
            count_rent:product.count_rent,
            created_at:product.create_at,
            updated_at:product.update_at
        }

        res.json(responseProduct);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'ERR : 001'});
    }
}

export const createProduct = async (req:Request,res:Response)=>{
    const {name,price_base,price_per_day,description,size,created_by} = req.body;
    if(!name || !price_base || !price_per_day  || !created_by){
        res.status(400).json({message:'Please enter all fields'});
        return;
    }
    //insert image
    if(!req.file){
        res.status(400).json({message:'Please upload image'});
        return;
    }
    const allowedType = ['image/png','image/jpg','image/jpeg'];
    if(!allowedType.includes(req.file.mimetype)){
        res.status(400).json({message:'Please upload image'});
        return;
    }
    const imageName = name.replace(/\s/g,'-') + '-' + Date.now() + '.jpg';
    const imageBuffer = req.file.buffer;
    const pathImage =await uploadImage(imageBuffer,imageName);
    
    try{

        const img = await imgModel.create(pathImage.smallImagePath,pathImage.mediumImagePath,pathImage.largeImagePath);
        
        const productData: ProductInterface = {
                name: name,
                description: description,
                img_id: img.id,
                created_by: parseInt(created_by),
            }

        const product = await productModel.create(productData);

        const cost_rent = await costRentModel.create(parseFloat(price_base),parseInt(price_per_day),product.id);
        
        const sizeStock:string[][] = size;
        const stockData=[];

        for(let i=0;i<sizeStock[0].length;i++){
            for(let j=0;j<parseInt(sizeStock[1][i]);j++){
                const data_stock = {
                    product_id:product.id,
                    size:sizeStock[0][i]
                };
                stockData.push(data_stock);
            }
        }
        const stock = await stockModel.create(stockData);

        res.json(product);    
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'ERR : 002'});
        return;
    }


}

export const updateProduct = async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    const {name,price_base,price_per_day,description,size,updated_by} = req.body;
    if(!name || !price_base || !price_per_day || !updated_by){
        res.status(400).json({message:'Please enter all fields'});
        return;
    }
    try{
        const product = await productModel.find(id);
        if(!product){
            res.status(404).json({message:'Product not found'});
            return;
        }
        if(!product.img_id){
            res.status(404).json({message:'Image not found'});
            return;
        }
        const cost_rent = await costRentModel.find(id);
        if(!cost_rent){
            res.status(404).json({message:'Cost rent not found'});
            return;
        }
        
        const img = await imgModel.find(product.img_id);
        if(!img){
            res.status(404).json({message:'Image not found'});
            return;
        }

        const sizeCount = await stockModel.count(product.id);
        const sizeStock:string[][] = size;
        if(sizeCount.length !== 0){
            for(let i=0;i<sizeCount.length;i++){
                for(let j=0;j<sizeStock[0].length;j++){
                    if(sizeCount[i].size === sizeStock[0][j]){
                        sizeStock[1][j] = (parseInt(sizeStock[1][j]) - sizeCount[i].count).toString();
                        if(parseInt(sizeStock[1][j]) < 0){
                        const stock = await stockModel.findFilter(product.id,sizeStock[0][j]);
                        if(stock){
                            for(let k=0;k<Math.abs(parseInt(sizeStock[1][j]));k++){
                                const s = await stockModel.remove(stock[k].id);
                            }
                        }
                    }
                    }
                }
            }
        }

        const stockData=[];
        for(let i=0;i<sizeStock[0].length;i++){
            for(let j=0;j<parseInt(sizeStock[1][i]);j++){
                const data_stock = {
                    product_id:product.id,
                    size:sizeStock[0][i]
                };
                stockData.push(data_stock);
            }
        }
        if(stockData.length !== 0){
            const stock = await stockModel.create(stockData)
        }

        if(req.file){
            const allowedType = ['image/png','image/jpg','image/jpeg'];
            if(!allowedType.includes(req.file.mimetype)){
                res.status(400).json({message:'Please upload image'});
                return;
            }
            const imageName = name.replace(/\s/g,'-') + '-' + Date.now() + '.jpg';
            const imageBuffer = req.file.buffer;
            const pathImage =await uploadImage(imageBuffer,imageName);

            const imgUpdate = await imgModel.update(img.id,pathImage.smallImagePath,pathImage.mediumImagePath,pathImage.largeImagePath);
            console.log(imgUpdate);
        }
        

        const productData: ProductInterface = {
            name: name,
            description: description,
            img_id: img.img_id,
            updated_by: parseInt(updated_by),
        }
        const productUpdate = await productModel.update(id,productData);
        const cost_rentUpdate = await costRentModel.update(cost_rent.id,parseFloat(price_base),parseInt(price_per_day));
        console.log(productUpdate);
        console.log(cost_rentUpdate);
        
        res.json(productUpdate);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'ERR : 002'});
        return;
    }
}
export const removeProduct = async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    try{
        const product = await productModel.find(id);
        if(!product){
            res.status(404).json({message:'Product not found'});
            return;
        }
        await costRentModel.removeAll(product.id);

        const stock = await stockModel.removeAll(product.id);

        const productRemove = await productModel.remove(id);
        res.json(productRemove);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'ERR : 002'});
        return;
    }

}


const uploadImage= async (imgBuffer:Buffer,imgName:string)=>{

    const smallImage =  await sharp(imgBuffer).resize(200,200).toBuffer();
    const mediumImage = await sharp(imgBuffer).resize(400,400).toBuffer();
    const largeImage = await sharp(imgBuffer).resize(800,800).toBuffer();

    const smallImageName = imgName.replace('.jpg','-small.jpg');
    const mediumImageName = imgName.replace('.jpg','-medium.jpg');
    const largeImageName = imgName.replace('.jpg','-large.jpg');

    const imagePath = 'C:/Users/mrbig/Documents/pic';
    const smallImagePath = imagePath + '/s/' + smallImageName;
    const mediumImagePath = imagePath + '/m/' + mediumImageName;
    const largeImagePath = imagePath + '/l/' + largeImageName;

    await Promise.all([
        sharp(smallImage).toFile(smallImagePath),
        sharp(mediumImage).toFile(mediumImagePath),
        sharp(largeImage).toFile(largeImagePath)
    ]);
    return {smallImagePath,mediumImagePath,largeImagePath};

}