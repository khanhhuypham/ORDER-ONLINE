

export enum PAYMENT_METHOD {
    COD = 0, 
    PREPAYMENT = 1
}



//This enum is used 
export enum PAYMENT_TYPE {
    VIETQR = 0, 
    PAYOS = 1
}



export enum CURRENT_DRAWER {
    CHECKOUT = 1,
    CUSTOMER_INFOR = 2,
    VOUCHER = 3,
    PAYMENT_USING_QR_CODE = 4,
}


export enum DELIVERY_TYPE {
    IMMEDIATE = 1,
    SCHEDULED_FIRST = 2,
}

export enum SERVICE_TYPE {
    DINNING = 1,
    TAKEAWAY = 2,
    DELIVERY = 3
}


export enum ORDER_STATUS{
    PENDING = 0,
    COMPLETE = 1,
    RESTAURANT_CANCEL = 2, 
    CUSTOMER_CANCEL = 3,
    TEMP = 4, 
    CONFIRM = 6, 
    DRIVER_ACCEPTED = 7,
    DELIVERING = 8,
    COMPLETED_DELIVERY = 10,
    CANCELED_DELIVERY = 9,
    FAIL_DELIVERY = 11
}

