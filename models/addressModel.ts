import {PrismaClient,Address} from '@prisma/client';
import {AddressInterface} from '../interfaces/addressInterface';

const prisma = new PrismaClient();

export const create = async(data:AddressInterface):Promise<Address> =>{
    const address = await prisma.address.create({data});
    await prisma.$disconnect();

    return address;
}
export const findMany = async(userId :number ):Promise<Address[]> =>{
        const address = await prisma.address.findMany({
            where:{
                user_id:userId,
                NOT:{
                    status:'remove'
                }
            }
        })
        await prisma.$disconnect();
        return address;
}
export const find = async(id:number):Promise<Address | null> =>{
    const address = await prisma.address.findFirst({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return address;
}

export const update = async(id:number,data:AddressInterface):Promise<Address> =>{
    const address = await prisma.address.update({
        where:{
            id:id
        },
        data
    })
    await prisma.$disconnect();
    return address;
}

export const remove = async(id:number):Promise<Address> =>{
    const address = await prisma.address.update({
        where:{
            id:id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return address;
}

