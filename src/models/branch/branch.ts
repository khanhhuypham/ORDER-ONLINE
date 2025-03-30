export class Branch {
    id: number = 0;
    name: string = "";
    setting:Setting | undefined = undefined
    street_name: string = "";
    address_full_text: string = "";
    distance_km: number = 0;
    status: number = 0;
    phone_number: string = "";

    constructor(data?: Partial<Branch>) {
        Object.assign(this, data);
    }
}
interface Setting {
    is_enable_food_court: number 
    is_enable_delivery: number
    
}
