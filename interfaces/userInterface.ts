export interface UserInterface {
    username:string;
    password:string;
    name:string;
    surname:string;
    phone:string;
    email:string;
    createdAt?:Date;
    updatedAt?:Date;
    status?:string;
}