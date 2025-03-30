import { LocationModel } from "./location";

export class Voucher {
    id: number = 0;
    name: string = "";
    code: string = "";
    restaurant_id: number = 0;
    branch_ids: number[] = [];
    information: string = "";
    banner_image_url: string = "";
    min_order_amount: number = 0;
    discount_amount: number = 0;
    discount_percent: number = 0;
    max_discount_amount: number = 0;
    type: number = 0;
    is_active: number = 0;
    start_date: string = "";
    end_date: string = "";
    selected: boolean = false;

    constructor(data?: Partial<Voucher>) {
        Object.assign(this, data);
    }
}


