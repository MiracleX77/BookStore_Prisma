import {PrismaClient,Rental} from '@prisma/client';
import { RentalInterface ,RentalUpdateInterface} from 'interfaces/transactionInterface';

const prisma = new PrismaClient();

export const create = async(data:RentalInterface):Promise<Rental> =>{
    const rental = await prisma.rental.create({
        data:data
    })
    await prisma.$disconnect();
    return rental;
}
export const find = async(id:number):Promise<Rental|null> =>{
    const rental = await prisma.rental.findUnique({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }
        }
    })
    await prisma.$disconnect();
    return rental;
}
export const update = async(id:number,data:RentalUpdateInterface):Promise<Rental> =>{
    const rental = await prisma.rental.update({
        where:{
            id:id
        },
        data:data
    })
    await prisma.$disconnect();
    return rental;
}
