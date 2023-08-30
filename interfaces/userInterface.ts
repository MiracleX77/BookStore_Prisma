export interface UserInsertInterface {
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
export interface UserUpdateInterface {
    username?:string;
    password?:string;
    name:string;
    surname:string;
    phone:string;
    email:string;
    createdAt?:Date;
    updatedAt?:Date;
    update_by?:number;
    status?:string;
}
export interface AdminInsertInterface {
    username:string;
    password:string;
    name:string;
    surname:string;
    phone:string;
    email:string;
    address:string;
    role:string;
    id_card:string;
}
