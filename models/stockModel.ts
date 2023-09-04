import {PrismaClient,Stock} from '@prisma/client';

const prisma = new PrismaClient();

export const create = async(size_stock:{ product_id: number; size: string; }[]):Promise<number>=>{
    const stock = await prisma.stock.createMany({
        data:size_stock
    })
    await prisma.$disconnect();
    return size_stock[0].product_id;
}

export const find = async(id:number):Promise<Stock[] | null> =>{
    const stock = await prisma.stock.findMany({
        where:{
            product_id:id,
            NOT:{
                status:'remove'
            }
        }
        

    })
    await prisma.$disconnect();
    return stock;
}

export const count = async (id: number): Promise<{ size: string; count: number }[]> => {
    const stocks = await prisma.stock.groupBy({
        by: ['size'],
        _count: {
            size: true,
            _all: true,
        },
        where: {
            status: 'active',
            product_id: id,
        },
    });
    await prisma.$disconnect();

    const sizeCountList: { size: string; count: number }[] = stocks.map((stock) => ({
        size: stock.size,
        count: stock._count._all,
    }));

    return sizeCountList;
};

export const findFilterOne = async (id:number,size:string,status:string):Promise<Stock | null> =>{
    const stock = await prisma.stock.findFirst({
        where:{
            product_id:id,
            size:size,
            status:status
        }
    })
    await prisma.$disconnect();
    return stock;
}
export const findFilterAll = async (id:number,size:string,status:string):Promise<Stock[] | null> =>{
    const stock = await prisma.stock.findMany({
        where:{
            product_id:id,
            size:size,
            status:status
        }
    })
    await prisma.$disconnect();
    return stock;
}
export const update = async(id:number,data:Stock):Promise<Stock> =>{
    const stock = await prisma.stock.update({
        where:{
            id:id
        },
        data
    })
    await prisma.$disconnect();
    return stock;
}
export const updateStatus = async(id:number,status:string):Promise<Stock> =>{
    const stock = await prisma.stock.update({
        where:{
            id:id
        },
        data:{
            status:status
        }
    })
    await prisma.$disconnect();
    return stock;
}
export const remove = async(id:number):Promise<Stock> =>{
    const stock = await prisma.stock.update({
        where:{
            id:id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return stock;
}
export const removeAll = async(product_id:number):Promise<boolean> =>{
    const stock = await prisma.stock.updateMany({
        where:{
            product_id:product_id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return true;
}