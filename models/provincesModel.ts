import {PrismaClient,Provinces} from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async():Promise<Provinces[]> =>{
    const provinces = await prisma.provinces.findMany()
    await prisma.$disconnect();
    return provinces;
}


export const getById = async(id:number):Promise<Provinces | null> =>{
    const provinces = await prisma.provinces.findUnique({
        where:{
            id: id
        }
    })
    await prisma.$disconnect();
    return provinces;
}

