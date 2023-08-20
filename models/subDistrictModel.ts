import {PrismaClient,SubDistrict} from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async():Promise<SubDistrict[]> =>{
    const subDistrict = await prisma.subDistrict.findMany()
    await prisma.$disconnect();
    return subDistrict;
}

export const getByDistrictId = async(district_id:number):Promise<SubDistrict[]> =>{
    const subDistrict = await prisma.subDistrict.findMany({
        where:{
            district_id: district_id
        }
    })
    await prisma.$disconnect();
    return subDistrict;
}

export const getById = async(id:number):Promise<SubDistrict | null> =>{
    const subDistrict = await prisma.subDistrict.findUnique({
        where:{
            id: id
        }
    })
    await prisma.$disconnect();
    return subDistrict;
}

