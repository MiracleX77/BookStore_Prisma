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