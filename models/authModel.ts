import {PrismaClient,User} from '@prisma/client';
import { Prisma } from '.prisma/client';
import {UserData} from '../interfaces/userData';

const prisma = new PrismaClient();

export const create = async(data:UserData):Promise<User> =>{
    const user = await prisma.user.create({data});
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
        return user;
    }
    else{
        return null;   
    }
}