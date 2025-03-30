import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemEntity } from "../../models/item/item";
import {  PAYMENT_METHOD, SERVICE_TYPE } from "../../constants/enum";

import { Voucher } from "../../models/voucher";
import { LocationModel } from "../../models/location";



export interface ICartState {
    items: ItemEntity[];
    service_type:SERVICE_TYPE;
    paymentMethod:PAYMENT_METHOD;
    voucher:Voucher 
    submitUserInfor?:(() => void) 
    totalAmount:number 
    shippingFee:number
    netAmount:number 
    location:LocationModel
}

const initialState: ICartState = {
    items:[],
    service_type:SERVICE_TYPE.DELIVERY,
    paymentMethod:PAYMENT_METHOD.PREPAYMENT,
    voucher: new Voucher(),
    totalAmount:0,
    shippingFee:0,
    netAmount:0,
    location:new LocationModel()
};

// Helper function to calculate total amount
const calculateTotalAmount = (items: ItemEntity[]): number => {
    return items.reduce((acc, item) => {


        const price = Number(item.price)  || 0;

        const quantity = Number(item.quantity) || 0;

        let total_amount = price * quantity

        item.addition_foods.filter((f) => f.select).forEach((food,i) => {
            total_amount += food.quantity * food.price
        })
        

        return acc + total_amount;
    }, 0);
};

// Helper function to calculate net amount
const calculateNetAmount = (state: ICartState): number => {

    let totalAmount = calculateTotalAmount(state.items);

    const { voucher,service_type } = state;

    // Apply voucher discount
    if (voucher.id > 0) {

        if (voucher.discount_amount > 0) {
            totalAmount -= voucher.discount_amount;
        } else if (voucher.discount_percent > 0) {
            // totalAmount -= totalAmount * (voucher.discount_percent / 100);
            let discount = totalAmount * (voucher.discount_percent / 100);
            if (discount >= voucher.max_discount_amount){
                discount = voucher.max_discount_amount
               
            }
            totalAmount -= discount
        }
    }

    if (service_type === SERVICE_TYPE.DELIVERY) {
        totalAmount += state.shippingFee
    }


    return totalAmount;
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        addItem: (state: ICartState, action: PayloadAction<ItemEntity>) => {
            state.items.push(action.payload)
            state.totalAmount = calculateTotalAmount(state.items);
            state.netAmount = calculateNetAmount(state);
        },

        editItem: (state: ICartState, action: PayloadAction<{index:number,item:ItemEntity}>) => {

            const {index,item} = action.payload
            
            if (index !== -1){

                if (item.quantity <= 0){
                    state.items.splice(index, 1);
                }else{
                    state.items[index] = item;
                }

            }

            state.totalAmount = calculateTotalAmount(state.items);
            state.netAmount = calculateNetAmount(state);

        },
          
        removeItemFromCart: (state: ICartState, action: PayloadAction<number>) => {
            const index: number = action.payload
            
            state.items.splice(index, 1);
            state.totalAmount = calculateTotalAmount(state.items);
            if (state.totalAmount < state.voucher.min_order_amount){
                state.voucher = new Voucher()
            }
        
            state.netAmount = calculateNetAmount(state);
          
        },

        removeAllItemsFromCart: (state: ICartState) => {
            state.items = []
            state.totalAmount = 0;
            state.netAmount = 0;
        },

        setSubmitUserInfor: (state: ICartState,action: PayloadAction<(()=>void)>) => {
            state.submitUserInfor = action.payload 
        },

        setShipFee: (state: ICartState,action: PayloadAction<number>) => {
            state.shippingFee = action.payload
            state.totalAmount = calculateTotalAmount(state.items);
            state.netAmount = calculateNetAmount(state);
        },

        setServiceType: (state: ICartState,action: PayloadAction<SERVICE_TYPE>) => {
            state.service_type = action.payload
            state.netAmount = calculateNetAmount(state);
        },
     
        setPaymentMethod: (state: ICartState,action: PayloadAction<PAYMENT_METHOD>) => {
            state.paymentMethod = action.payload
        },

        setVoucher: (state: ICartState,action: PayloadAction<Voucher>) => {
            state.voucher = action.payload
            state.netAmount = calculateNetAmount(state);
        },


        setLocation: (state: ICartState,action: PayloadAction<LocationModel>) => {
            state.location = action.payload
        },


        clearCart: (state: ICartState) => {
            state.voucher = new Voucher()
            state.items = []
            state.service_type = SERVICE_TYPE.DELIVERY;
            state.shippingFee = 0
            state.totalAmount = 0;
            state.netAmount = 0;
            state.location = new LocationModel()
        },

    },
});

export const {addItem,editItem,removeItemFromCart,removeAllItemsFromCart,setSubmitUserInfor,setShipFee,setServiceType,setPaymentMethod,setVoucher,setLocation,clearCart} = cartSlice.actions;

