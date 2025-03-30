import { Brand } from "../brand/brand";

export class Restaurant {
    id: number = 0;
    logo: string = "";
    banner: string = "";
    name: string = "";
    restaurant_brands:Brand[] = []

    constructor(data?: Partial<Restaurant>) {
        Object.assign(this, data);
    }
}


