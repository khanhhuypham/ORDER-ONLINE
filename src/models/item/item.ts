// import { CATEGORY_TYPE } from "../../constants/enum/CATEGORY_TYPE";
import { ChidlrenItem } from "./item-children";

export class ItemEntity {
    id: number = 0;
    avatar: string = "";
    name: string = "";
    food_name: string = "";
    price: number = 0;
    category_id:number = 0;
    category_name: string = "";

    food_in_combo: ChidlrenItem[] = [];

    addition_foods:ChidlrenItem[] = []


    //these two below variables is used to map field when callling api related to order detail
    customer_order_detail_combo: ChidlrenItem[] = [];
    customer_order_detail_addition:ChidlrenItem[] = []


    food_addition_ids:number[] = []
    quantity: number = 0;
    note: string = "" ;
    description:string = ""


    constructor(data?: Partial<ItemEntity>) {
        Object.assign(this, data);
    }
}

