import { PrismaClient,Payment } from "@prisma/client";
import { PaymentInterface } from "../interfaces/orderInterface";

const prisma = new PrismaClient();

export const create = async (data:PaymentInterface):Promise<Payment> =>{
    const payment = await prisma.payment.create({
        data:{
            type:data.type,
            total_cost:data.total_cost,
            contact_name:data.contact_name,
            contact_phone:data.contact_phone,
            email:data.email,
            img_id:data.img_id,
            
        }
    })
    await prisma.$disconnect();
    return payment;
}
export const updateStatus = async (id:number,status:string):Promise<Payment> =>{
    const payment = await prisma.payment.update({
        where:{
            id:id,
        },
        data:{
            status:status,
        }
    });
    await prisma.$disconnect();
    return payment;
}