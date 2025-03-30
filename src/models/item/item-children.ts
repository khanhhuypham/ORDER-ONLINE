import { Category } from "../category/category";


export class ChidlrenItem {
    id: number = 0;
    name: string = "";
    avatar: string = "";
    price: number = 0;
    combo_quantity:number = 0
    quantity:number = 0
    select:boolean = false


    constructor(data?: Partial<ChidlrenItem>) {
        Object.assign(this, data);
    }
}