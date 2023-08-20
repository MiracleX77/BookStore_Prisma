import {PrismaClient,District} from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async():Promise<District[]> =>{
    const district = await prisma.district.findMany()
    await prisma.$disconnect();
    return district;
}

export const getByProvinceId = async(province_id:number):Promise<District[]> =>{
    const district = await prisma.district.findMany({
        where:{
            province_id: province_id
        }
    })
    await prisma.$disconnect();
    return district;
}

export const getById = async(id:number):Promise<District | null> =>{
    const district = await prisma.district.findUnique({
        where:{
            id: id
        }
    })
    await prisma.$disconnect();
    return district;
}

