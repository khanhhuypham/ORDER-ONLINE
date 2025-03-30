import { COOKIE_KEYS } from "../constants/cookie-key";
import { DELIVERY_TYPE, SERVICE_TYPE } from "../constants/enum";
import { getCurrentDateTime } from "../utils/time-utils";
import { LocationModel } from "./location";
import Cookies from 'js-cookie';

export class CustomerInfor {
    id:number = generateDeviceId()
    service_type:SERVICE_TYPE = SERVICE_TYPE.DELIVERY
    name: string = "";
    phone: string = "";
    location: LocationModel = new LocationModel();
    note: string = "";
    delivery_type: DELIVERY_TYPE = DELIVERY_TYPE.IMMEDIATE;
    receive_date: string = getCurrentDateTime()



    constructor(data?: Partial<CustomerInfor>) {
        
        
    
        try {

            const user = Cookies.get(COOKIE_KEYS.USER);

            if (user) {
                const parsedUser = JSON.parse(user) as Partial<CustomerInfor>;
                if (parsedUser.id) {
                    this.id = parsedUser.id;
                }
            }
        } catch (error) {
            console.error("Error parsing user data from cookies:", error);
        }

        // Assign any provided data
        Object.assign(this, data);

    }


}

function generateDeviceId() {
    // Generate a reasonably large random number (e.g., 16 digits).
    // Consider using a more robust UUID generator if needed.
    return Math.floor(Math.random() * 1000000);
}