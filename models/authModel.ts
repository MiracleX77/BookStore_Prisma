import {PrismaClient,User} from '@prisma/client';
import { Prisma } from '.prisma/client';
import {UserInterface} from '../interfaces/userInterface';

const prisma = new PrismaClient();

export const create = async(data:UserInterface):Promise<User> =>{
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