import {PrismaClient,Delivery} from '@prisma/client';
import {DeliveryInterface,DeliveryUpdateInterface} from '../interfaces/orderInterface';

const prisma = new PrismaClient();

export const create = async (data:DeliveryInterface):Promise<Delivery> =>{
    const delivery = await prisma.delivery.create({
        data:{
            address_id:data.address_id,
            delivery_type:data.delivery_type,
        }
    });
    await prisma.$disconnect();

    return delivery;
}
export const update = async (id:number,data:DeliveryUpdateInterface):Promise<Delivery> =>{
    const delivery = await prisma.delivery.update({
        where:{
            id:id
        },
        data:{
            tracking_number:data.tracking_number,
            date_start:data.date_start,
            date_end:data.date_end,
            status:data.status,
        }
    })
    await prisma.$disconnect();
    return delivery;
}