import {PrismaClient,User} from '@prisma/client';
import { promises } from 'dns';

const prisma = new PrismaClient()

const create = async(): Promise<User> => {
    const newUser = await prisma.user.create({
        data: {
            name:"big",
            surname : "phatchara",
        },
    })

    return newUser
};

const findUsers = async() : Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users
};

findUsers().then((res) => console.log(res))