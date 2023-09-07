import {PrismaClient,Transaction} from '@prisma/client';
import{TransactionInterface,TransactionResponseInterface,TransactionUpdateInterface} from '../interfaces/transactionInterface';
const prisma = new PrismaClient();

export const create = async (data:TransactionInterface):Promise<Transaction> =>{
    const transaction = await prisma.transaction.create({
        data
    });
    await prisma.$disconnect();

    return transaction;
}
export const find = async (id:number):Promise<TransactionResponseInterface|null> =>{
    const transaction = await prisma.transaction.findUnique({
        where:{
            id:id,
            NOT:{
                status:"cancel"
            }
        },
        include:{
            product:{
                select:{
                    id:true,
                    name:true,
                    img_id:true,
                }
            },
            rental:{
                select:{
                    id:true,
                    date_rent:true,
                    date_admin_receive:true,
                    date_user_receive:true,
                    date_return:true,
                }
            },
        }
    });

    await prisma.$disconnect();
    if(!transaction || !transaction.product || !transaction.rental){
        return null;
    }
    const transactionResponse:TransactionResponseInterface = {
        id:transaction.id,
            order_id:transaction.order_id,
            img_product:{
                img_before_id:transaction.img_before_id,
                img_after_id:transaction.img_after_id,
            },
            product:{
                id:transaction.product.id,
                name:transaction.product.name,
                img:transaction.product.img_id.toString(),
            },
            rental:{
                id:transaction.rental.id,
                date_rent:transaction.rental.date_rent,
                date_admin_receive:transaction.rental.date_admin_receive,
                date_user_receive:transaction.rental.date_user_receive,
                date_return:transaction.rental.date_return,
            },
            cost:transaction.cost,
            size:transaction.size,
            status:transaction.status,
            create_at:transaction.create_at,

    }
    return transactionResponse;
}
export const findByUser = async (user_id:number):Promise<TransactionResponseInterface[]> =>{
    const transaction = await prisma.transaction.findMany({
        where:{
            user_id:user_id,
            NOT:{
                status:"cancel"
            }
        },
        include:{
            product:{
                select:{
                    id:true,
                    name:true,
                    img_id:true,
                }
            },
            rental:{
                select:{
                    id:true,
                    date_rent:true,
                    date_admin_receive:true,
                    date_user_receive:true,
                    date_return:true,
                }
            },
        }
    });
    await prisma.$disconnect();
    if(!transaction || !transaction[0] || !transaction[0].product || !transaction[0].rental){
        return [];
    }

    const transactionResponse:TransactionResponseInterface[] = transaction.map((transaction) => ({
        
        id:transaction.id,
            order_id:transaction.order_id,
            img_product:{
                img_before_id:transaction.img_before_id,
                img_after_id:transaction.img_after_id,
            },
            product:{
                id:transaction.product.id,
                name:transaction.product.name,
                img:transaction.product.img_id.toString(),
            },
            rental:{
                id:transaction.rental.id,
                date_rent:transaction.rental.date_rent,
                date_admin_receive:transaction.rental.date_admin_receive,
                date_user_receive:transaction.rental.date_user_receive,
                date_return:transaction.rental.date_return,
            },
            create_at:transaction.create_at,
            cost:transaction.cost,
            size:transaction.size,
            status:transaction.status,
    }));
    return transactionResponse;
}
export const findByOrder = async (order_id:string):Promise<TransactionResponseInterface[]> =>{
    const transaction = await prisma.transaction.findMany({
        where:{
            order_id:order_id,
            NOT:{
                status:"cancel"
            }
        },
        include:{
            product:{
                select:{
                    id:true,
                    name:true,
                    img_id:true,
                }
            },
            rental:{
                select:{
                    id:true,
                    date_rent:true,
                    date_admin_receive:true,
                    date_user_receive:true,
                    date_return:true,
                }
            },
        }
    });
    await prisma.$disconnect();
    if(!transaction || !transaction[0] || !transaction[0].product || !transaction[0].rental){
        return [];
    }

    const transactionResponse:TransactionResponseInterface[] = transaction.map((transaction) => ({
            id:transaction.id,
            order_id:transaction.order_id,
            img_product:{
                img_before_id:transaction.img_before_id,
                img_after_id:transaction.img_after_id,
            },
            product:{
                id:transaction.product.id,
                name:transaction.product.name,
                img:transaction.product.img_id.toString(),
            },
            rental:{
                id:transaction.rental.id,
                date_rent:transaction.rental.date_rent,
                date_admin_receive:transaction.rental.date_admin_receive,
                date_user_receive:transaction.rental.date_user_receive,
                date_return:transaction.rental.date_return,
            },
            create_at:transaction.create_at,
            cost:transaction.cost,
            size:transaction.size,
            status:transaction.status,
    }));
    return transactionResponse;
}
export const update = async (id:number,data:TransactionUpdateInterface):Promise<Transaction> =>{
    const transaction = await prisma.transaction.update({
        where:{
            id:id,
        },
        data:{
            order_id:data.order_id,
            img_after_id:data.img_after_id,
            img_before_id:data.img_before_id,
            service_cost:data.cost_damages,
            cost:data.cost,
        }
    });
    await prisma.$disconnect();
    return transaction;
}
export const updateStatus = async (id:number,status:string):Promise<Transaction> =>{
    const transaction = await prisma.transaction.update({
        where:{
            id:id,
        },
        data:{
            status:status,
        }
    });
    await prisma.$disconnect();
    return transaction;
}
export const updateBefore = async (id:number,img_before_id:number):Promise<Transaction> =>{
    const transaction = await prisma.transaction.update({
        where:{
            id:id,
        },
        data:{
            img_before_id:img_before_id,
        }
    });
    await prisma.$disconnect();
    return transaction;
}
export const updateAfter = async (id:number,img_after_id:number):Promise<Transaction> =>{
    const transaction = await prisma.transaction.update({
        where:{
            id:id,
        },
        data:{
            img_after_id:img_after_id,
        }
    });
    await prisma.$disconnect();
    return transaction;
}

