import { ORDER_STATUS } from "../../constants/enum";

export class Order {
    id: number = 0;
    branch_id:number = 0
    note: string = "";
    customer_name: string = "";
    phone: string = "";
    address: string = "";
    total_amount: number = 0;
    shipping_fee: number = 0;
    restaurant_third_party_delivery_id: number = 0
    third_party_delivery_order_id: string = "";
    third_party_delivery_name: string = "";
    customer_order_status:ORDER_STATUS = ORDER_STATUS.PENDING
    shipping_lat: string = "";
    shipping_lng: string = "";
    tracking_url: string = "";
    created_at:string = ""

  
    constructor(data?: Partial<Order>) {
        Object.assign(this, data);
    }
}