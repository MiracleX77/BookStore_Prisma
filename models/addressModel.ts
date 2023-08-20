import {PrismaClient,Address} from '@prisma/client';
import {AddressInterface} from '../interfaces/addressInterface';

const prisma = new PrismaClient();

export const create = async(data:AddressInterface):Promise<Address> =>{
    const address = await prisma.address.create({data});
    await prisma.$disconnect();

    return address;
}

// export const find = async(columnName: string,value:string):Promise<Address | null> =>{
//     if(columnName === 'username'){
//         const user = await prisma.user.findFirst({
//             where:{
//                 username: value,
//                 NOT:{
//                     status: 'remove'
//                 }
//             }
            
//         });
//         await prisma.$disconnect();
//         return user;
//     }
//     else{
//         return null;   
//     }
// }