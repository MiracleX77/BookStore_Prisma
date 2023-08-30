import {PrismaClient,User} from '@prisma/client';
import { Prisma } from '.prisma/client';
import {UserInsertInterface,UserUpdateInterface} from '../interfaces/userInterface';

const prisma = new PrismaClient();

export const create = async(data:UserInsertInterface):Promise<User> =>{
    const user = await prisma.user.create({data});
    await prisma.$disconnect();

    return user;
}
export const find = async(columnName: string,value:string):Promise<User | null> =>{
    if(columnName === 'username'){
        const user = await prisma.user.findFirst({
            where:{
                username: value,
                NOT:{
                    status: 'remove'
                }
            }
            
        });
        await prisma.$disconnect();
        return user;
    }
    else{
        return null;   
    }
}
export const findAll = async():Promise<User[]> =>{
        const users = await prisma.user.findMany({
            where:{
                NOT:{
                    status: 'remove'
                }
            }
        
        });
        await prisma.$disconnect();
        return users;
    }

export const findByID = async(id:number):Promise<User | null> =>{
    const user = await prisma.user.findFirst({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return user;
}

export const update = async(id:number,data:UserUpdateInterface):Promise<User> =>{
    const user = await prisma.user.update({
        where:{
            id:id
        },
        data
    })
    await prisma.$disconnect();
    return user;
}

export const remove = async(id:number):Promise<User> =>{
    const user = await prisma.user.update({
        where:{
            id:id
        },
        data:{
            status:'remove'
        }
    })
    await prisma.$disconnect();
    return user;
}