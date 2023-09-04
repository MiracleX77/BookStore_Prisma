export interface AddressInterface {
    user_id:number;
    address_line:string;
    sub_district_id:number;
    district_id:number;
    province_id:number;
    createdAt?:Date;
    updatedAt?:Date;
    status?:string;
}

export interface AddressResponseInterface {
    id:number;
    user_id:number;
    address_line:string;
    sub_district:{
        name_th:string;
        name_en:string;
    }
    district:{
        name_th:string;
        name_en:string;
    }
    province:{
        name_th:string;
        name_en:string;
    }
    createdAt?:Date;
    zip_code?:string;
}