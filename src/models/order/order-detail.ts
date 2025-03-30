import { ORDER_STATUS, PAYMENT_METHOD } from "../../constants/enum";
import { ItemEntity } from "../item/item";

export class OrderDetail {
    id: number = 0;
    restaurant_id:number = 0
    restaurant_brand_id:number = 0
    branch_id:number = 0
    note: string = "";
    customer_name: string = "";
    phone: string = "";
    address: string = "";
    amount: number = 0;
    total_amount: number = 0;
    shipping_fee: number = 0;
    customer_order_details:ItemEntity[] = []
    payment_method:PAYMENT_METHOD = PAYMENT_METHOD.PREPAYMENT
    restaurant_third_party_delivery_id: number = 0
    third_party_delivery_order_id: string = "";
    third_party_delivery_name: string = "";
    customer_order_status:ORDER_STATUS = ORDER_STATUS.PENDING
    shipping_lat: string = "";
    shipping_lng: string = "";
    tracking_url: string = "";
    created_at:string = ""
    voucher_percent: number = 0;
    voucher_amount: number = 0;


  
    constructor(data?: Partial<OrderDetail>) {
        Object.assign(this, data);
    }
}