import {PrismaClient,Admin} from '@prisma/client';
import { Prisma } from '.prisma/client';
import {AdminInsertInterface,AdminUpdateInterface} from '../interfaces/adminInterface';

const prisma = new PrismaClient();

export const create = async(data:AdminInsertInterface):Promise<Admin> =>{
    const admin = await prisma.admin.create({data});
    await prisma.$disconnect();

    return admin;
}
export const find = async(columnName: string,value:string):Promise<Admin | null> =>{
    if(columnName === 'username'){
        const admin = await prisma.admin.findFirst({
            where:{
                username: value,
                NOT:{
                    status: 'remove'
                }
            }
            
        });
        await prisma.$disconnect();
        return admin;
    }
    else{
        return null;   
    }
}
export const findAll = async():Promise<Admin[]> =>{
        const admins = await prisma.admin.findMany({
            where:{
                NOT:{
                    status: 'remove'
                }
            }
        
        });
        await prisma.$disconnect();
        return admins;
    }

export const findByID = async(id:number):Promise<Admin | null> =>{
    const admin = await prisma.admin.findFirst({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return admin;
}

export const update = async(id:number,data:AdminUpdateInterface):Promise<Admin> =>{
    const admin = await prisma.admin.update({
        where:{
            id:id
        },
        data
    })
    await prisma.$disconnect();
    return admin;
}

export const remove = async(id:number):Promise<Admin> =>{
    const admin = await prisma.admin.update({
        where:{
            id:id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return admin;
}