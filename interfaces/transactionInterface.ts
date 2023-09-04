export interface TransactionInterface {
    order_id?:string;
    user_id:number;
    product_id:number;
    rental_id:number;
    cost:number;
    size:string;
    create_at?:Date;
    update_at?:Date;
    status?:string;
}

export interface TransactionResponseInterface {
    id:number;
    order_id:string | null;
    img_product:{
        img_before_id?:number | null;
        img_after_id?:number | null;
        img_before_s?:string;
        img_before_m?:string;
        img_before_l?:string;
        img_after_s?:string;
        img_after_m?:string;
        img_after_l?:string;
    }
    product:{
        id:number;
        name?:string;
        img:string;
    }
    rental:{
        id?:number;
        date_rent?:Date;
        date_receive?:Date | null;
        date_return?:Date | null;
    }
    cost:number | null;
    size:string;
    status:string;
    create_at:Date;
}
export interface RentalInterface {
    date_rent:Date;
    date_return:Date;
    date_receive?:Date;
    total_cost:number;
    status?:string;

}