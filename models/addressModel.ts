import {PrismaClient,Address} from '@prisma/client';
import {AddressInterface,AddressResponseInterface,AddressUpdateInterface} from '../interfaces/addressInterface';

const prisma = new PrismaClient();

export const create = async(data:AddressInterface):Promise<Address> =>{
    const address = await prisma.address.create({
        data:{
            user_id:data.user_id,
            address_line:data.address_line,
            district_id:data.district_id,
            province_id:data.province_id,
            sub_district_id:data.sub_district_id,            
        }
    });
    await prisma.$disconnect();

    return address;
}
export const findMany = async(userId :number ):Promise<AddressResponseInterface[]> =>{
        const address = await prisma.address.findMany({
            where:{
                user_id:userId,
                NOT:{
                    status:'remove'
                }
            },
            include:{
                addressSub_district:{
                    select:{
                        name_th:true,
                        name_en:true,
                        zipcode:true

                    }
                },
                addressDistrict:{
                    select:{
                        name_th:true,
                        name_en:true
                    }
                },
                addressProvince:{
                    select:{
                        name_th:true,
                        name_en:true
                    }
                }
            }
        })
        await prisma.$disconnect();
        
        const addressResponse:AddressResponseInterface[] = address.map((item)=>({
                id:item.id,
                user_id:item.user_id,
                address_line:item.address_line,
                sub_district:{
                    name_th:item.addressSub_district.name_th,
                    name_en:item.addressSub_district.name_en
                },
                district:{
                    name_th:item.addressDistrict.name_th,
                    name_en:item.addressDistrict.name_en
                },
                province:{
                    name_th:item.addressProvince.name_th,
                    name_en:item.addressProvince.name_en
                },
                zip_code:item.addressSub_district.zipcode,
                createdAt:item.create_at,
            }));
        
        return addressResponse;
}
export const find = async(id:number):Promise<AddressResponseInterface | null> =>{
    const address = await prisma.address.findFirst({
        where:{
            id:id,
            NOT:{
                status:'remove'
            }

        },
        include:{
            addressSub_district:{
                select:{
                    name_th:true,
                    name_en:true,
                    zipcode:true
                }
            },
            addressDistrict:{
                select:{
                    name_th:true,
                    name_en:true
                }
            },
            addressProvince:{
                select:{
                    name_th:true,
                    name_en:true
                }
            }
        }
    })
    await prisma.$disconnect();
    if(!address){
        return null;
    }
    const addressResponse:AddressResponseInterface = {
        id:address.id,
        user_id:address.user_id,
        address_line:address.address_line,
        sub_district:{
            name_th:address.addressSub_district.name_th,
            name_en:address.addressSub_district.name_en
        },
        district:{
            name_th:address.addressDistrict.name_th,
            name_en:address.addressDistrict.name_en
        },
        province:{
            name_th:address.addressProvince.name_th,
            name_en:address.addressProvince.name_en
        },
        zip_code:address.addressSub_district.zipcode,
        createdAt:address.create_at,
    }

    return addressResponse;
}

export const update = async(id:number,data:AddressUpdateInterface):Promise<Address> =>{
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

