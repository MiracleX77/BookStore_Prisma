import {PrismaClient,CostRent} from '@prisma/client';

const prisma = new PrismaClient();

export const create = async(cost_base:number,cost_per_day:number,product_id:number):Promise<CostRent> =>{
    const costRent = await prisma.costRent.create({
        data:{
            product_id:product_id,
            cost_base:cost_base,
            cost_per_day:cost_per_day
        }
    })
    await prisma.$disconnect();
    return costRent;
}
export const find = async(product_id:number):Promise<CostRent | null> =>{
    const costRent = await prisma.costRent.findFirst({
        where:{
            product_id:product_id,
            status:'active'

        }
    })
    await prisma.$disconnect();
    return costRent;
}

export const findAll = async():Promise<CostRent[]> =>{
        const costRent = await prisma.costRent.findMany({
            where:{
                NOT:{
                    status:'remove'
                }
            }
        })
        await prisma.$disconnect();
        return costRent;
    }

export const update = async(id:number,cost_base:number,cost_per_day:number):Promise<CostRent> =>{
    const costRent = await prisma.costRent.update({
        where:{
            id:id
        },
        data:{
            cost_base:cost_base,
            cost_per_day:cost_per_day
        }
    })
    await prisma.$disconnect();
    return costRent;
}
export const removeAll = async(product_id:number):Promise<void> =>{
    const costRent = await prisma.costRent.updateMany({
        where:{
            product_id:product_id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
}
