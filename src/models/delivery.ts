export class Delivery {
    distance: string = ""
    duration:string = ""
    message:string = ""
    id:string = ""
    restaurant_third_party_delivery_id:number = 0
    shipping_fee:number = 0

    constructor(data?: Partial<Delivery>) {
        Object.assign(this, data);
    }
}