import { PAYMENT_TYPE } from "../constants/enum";

export class QRCodeModel {
  
    transid: string = "";
    status: string = "";
    bank_number: string = "";
    bank_name: string = "";
    bank_account_name: string = "";
    qr_code: string = "";
    payment_type:PAYMENT_TYPE = PAYMENT_TYPE.VIETQR
    payment_url: string = "";
    expired_at: string = "";
    expired_time: number = 0;
    total_amount:number = 0

    constructor(data?: Partial<QRCodeModel>) {
        Object.assign(this, data);
    }
}


