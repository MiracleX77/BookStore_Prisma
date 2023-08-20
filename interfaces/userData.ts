export interface UserData {
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