
export interface OrderInterface {
    id:string;
    user_id:number;
    delivery_id?:number | null;
    payment_id:number;
    type_delivery:string;
    total_cost:number | null;
    status?:string;
    create_at?:Date;
}
export interface OrderUpdateInterface {
    delivery_return_id?:number;
}
export interface OrderDetailInterface {
    id:string;  
    user_id:number;
    payment:{
        id?:number;
        type:string;
        img_url:string;
        contact_name:string;
        contact_phone:string;
        email:string;
    };
    delivery?:{
        id?:number;
        address_line?:string;
        sub_district?:{
            name_th:string;
            name_en:string;
        }
        district?:{
            name_th:string;
            name_en:string;
        }
        province?:{
            name_th:string |null;
            name_en:string;
        }
        zip_code?:string;
        date_start?:Date | null;
        date_end?:Date | null;
        delivery_type?:string;
        tracking_number?:string | null;
        status?:string;
    }
    delivery_return?:{
        id?:number | null;
        delivery_type?:string | null;
        tracking_number?:string | null;
        date_start?:Date | null;
        date_end?:Date | null;
        status?:string | null;
    }
    cost:number | null;
    type_delivery:string;
    status?:string;
    create_at?:Date;
}

export interface DeliveryInterface {
    address_id?:number;
    date_start?:Date;
    date_end?:Date;
    delivery_type?:string;
    tracking_number?:string;
    status?:string;
}
export interface DeliveryUpdateInterface {
    tracking_number?:string;
    delivery_type?:string;
    status?:string;
    date_start?:Date;
    date_end?:Date;
}
export interface PaymentInterface {
    type:string;
    total_cost:number;
    contact_name:string;
    contact_phone:string;
    email:string;
    img_id:number;
    status?:string;
    create_at?:Date;
}