import {PrismaClient,Product} from '@prisma/client';
import {ProductInterface} from '../interfaces/productInterface';

const prisma = new PrismaClient();

export const create = async(data:ProductInterface):Promise<Product> =>{
    const product = await prisma.product.create({
        data:{
            name:data.name,
            description:data.description,
            img_id:data.img_id,
            create_by:data.created_by,
            
        }
    });
    await prisma.$disconnect();

    return product;
}
export const findAll = async():Promise<Product[] | null> =>{
        const product = await prisma.product.findMany({
            where:{
                NOT:{
                    status:'remove'
                }
            },
            include:{
                img:{
                    include:{
                        imgDetail:true
                    }
                },
                costRent:true
            }

            
        })
        await prisma.$disconnect();
        return product;
}
export const find = async(id:number):Promise<Product | null> =>{
    const product = await prisma.product.findFirst({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return product;
}

export const update = async(id:number,data:ProductInterface):Promise<Product> =>{
    const product = await prisma.product.update({
        where:{
            id:id
        },
        data:{
            name:data.name,
            description:data.description,
            img_id:data.img_id,
            update_by:data.updated_by,
        }
    })
    await prisma.$disconnect();
    return product;
}

export const remove = async(id:number):Promise<Product> =>{
    const product = await prisma.product.update({
        where:{
            id:id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return product;
}

