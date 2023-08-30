export interface ProductInterface{
    name:string;
    price?:number;
    description?:string;
    img_id?:number | null;
    count_rent?:number;
    created_at?:Date;
    created_by?:number;
    updated_at?:Date;
    updated_by?:number;
    status?:string;
}
export interface ResponseProductInterface{
    id:number;
    name:string;
    price:number | null;
    description:string | null;
    stock:{
        size:string;
        count:number;
    }[];
    img:{
        img_url_s?:string;
        img_url_m?:string;
        img_url_l?:string;
    } | null;
    cost_rent:{
        cost_base?:number | null;
        cost_per_day?:number | null;
    } | null;
    count_rent:number | null;
    created_at?:Date;
    updated_at?:Date;
}
