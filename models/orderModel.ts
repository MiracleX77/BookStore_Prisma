import {PrismaClient,Order} from '@prisma/client'
import {OrderInterface,OrderDetailInterface} from '../interfaces/orderInterface'

const prisma = new PrismaClient();

export const create = async (data:OrderInterface):Promise<Order> =>{
    const order = await prisma.order.create({
        data:{
            id:data.id,
            user_id:data.user_id,
            delivery_id:data.delivery_id,
            payment_id:data.payment_id,
            type_delivery:data.type_delivery,
            total_cost:data.total_cost,       
            status:data.status,     
        }
    })
    await prisma.$disconnect();
    return order;
}
export const find = async (id:string):Promise<OrderDetailInterface|null> =>{
    const order = await prisma.order.findUnique({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }
        },
        include:{
            delivery:{
                select:{
                    id:true,
                    address_id:true,
                    date_start:true,
                    date_end:true,
                    tracking_number:true,
                    status:true,
                }
            },
            payment:{
                select:{
                    id:true,
                    type:true,
                    img_id:true,
                    contact_name:true,
                    contact_phone:true,
                    email:true,
                }
            }
        }
    })
    await prisma.$disconnect();
    if(!order){
        return null;
    }
    if(!order.delivery){
        const orderDetail:OrderDetailInterface = {
            id:order.id,
            user_id:order.user_id,
            payment:{
                id:order.payment.id,
                type:order.payment.type,
                img_url:order.payment.img_id.toString(),
                contact_name:order.payment.contact_name,
                contact_phone:order.payment.contact_phone,
                email:order.payment.email,
            },
            type_delivery:order.type_delivery,
            cost:order.total_cost,
            status:order.status,
            create_at:order.create_at,
        }
        return orderDetail;
    }
    else{
        const orderDetail:OrderDetailInterface = {
            id:order.id,
            user_id:order.user_id,
            payment:{
                type:order.payment.type,
                img_url:order.payment.img_id.toString(),
                contact_name:order.payment.contact_name,
                contact_phone:order.payment.contact_phone,
                email:order.payment.email,
            },
            delivery:{
                id:order.delivery.id,
                address_line:order.delivery.address_id.toString(),
                date_start:order.delivery.date_start,
                date_end:order.delivery.date_end,
                tracking_number:order.delivery.tracking_number,
                status:order.delivery.status,
            },
            type_delivery:order.type_delivery,
            cost:order.total_cost,
            status:order.status,
            create_at:order.create_at,
        }
        return orderDetail;
    }
    
    
}
export const findMany = async (userId:number):Promise<Order[]> =>{
    const order = await prisma.order.findMany({
        where:{
            user_id:userId,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return order;
}
export const findAll = async ():Promise<Order[]> =>{
    const order = await prisma.order.findMany({
        where:{
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return order;
}
export const updateStatus = async (id:string,status:string):Promise<Order> =>{
    const order = await prisma.order.update({
        where:{
            id:id
        },
        data:{
            status:status
        }
    })
    await prisma.$disconnect();
    return order;
}
export const remove = async (id:string):Promise<Order> =>{
    const order = await prisma.order.update({
        where:{
            id:id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return order;
}
export const countByUserId = async (userId:number):Promise<number> =>{
    const order = await prisma.order.count({
        where:{
            user_id:userId,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return order;
}
