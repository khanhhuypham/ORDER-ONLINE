import { Branch } from "../branch/branch";

export class Brand {
    id: number = 0;
    name: string = "";
    banner: string = "";
    setting:Setting | undefined = undefined
    logo_url: string = "";
    branches: Branch[] = []
    
    constructor(data?: Partial<Brand>) {
        Object.assign(this, data);
    }
}

interface Setting {
    shipping_fee_amount: number 
    delivery_type: number
    
}