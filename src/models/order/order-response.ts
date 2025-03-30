export class OrderResponse {
  
    qr_code: string = "";
    customer_order_id: number = 0;
    bank_number: string = "";
    bank_name: string = "";
    bank_account_name: string = "";
    payment_url: string = "";
    total_amount: number = 0;

    constructor(data?: Partial<OrderResponse>) {
        Object.assign(this, data);
    }
}


