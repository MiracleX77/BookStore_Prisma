import {PrismaClient,Img,ImgDetail} from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (img_path_s:string,img_path_m:string,img_path_l:string):Promise<Img> =>{
    const img = await prisma.img.create({})
    await prisma.$disconnect();
    const imgDetail = await prisma.imgDetail.create({
        data:{
            img_id:img.id,
            img_url_s:img_path_s,
            img_url_m:img_path_m,
            img_url_l:img_path_l,
        }
    })
    await prisma.$disconnect();
    return img;
}

export const find = async (id:number) :Promise<ImgDetail | null> =>{
    const img_detail = await prisma.imgDetail.findFirst({
        where:{
            img_id:id
        }
    })
    await prisma.$disconnect();
    return img_detail;
}

export const findAll = async() :Promise<ImgDetail[] | null> =>{
    const img = await prisma.imgDetail.findMany({});
    await prisma.$disconnect();
    return img;
}
export const update = async (id:number,img_path_s:string,img_path_m:string,img_path_l:string) :Promise<ImgDetail> =>{
    const img_detail = await prisma.imgDetail.update({
        where:{
            id:id
        },
        data:{
            img_url_s:img_path_s,
            img_url_m:img_path_m,
            img_url_l:img_path_l,
        }
    })
    await prisma.$disconnect();
    return img_detail;
}