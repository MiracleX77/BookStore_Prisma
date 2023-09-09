
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
export interface UserResponseInterface {
    id:number;
    username:string;
    name:string | null;
    surname:string | null;
    phone:string | null;
    email:string | null;
    createdAt?:Date;
    update_by?:number | null;
    updatedAt?:Date;
    status?:string;
}
    
export interface AdminInsertInterface {
    username:string;
    password:string;
    name:string;
    surname:string;
    phone:string;
    email:string;
    role:string;
    id_card:string;
}
