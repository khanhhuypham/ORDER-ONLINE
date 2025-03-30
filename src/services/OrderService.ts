import axios from "axios";
import { ItemEntity } from "../models/item/item";
import { BaseResponse, Pagination } from "./base-response";
import axiosClient from "./configURL";
import { Voucher } from "../models/voucher";
import { CustomerInfor } from "../models/customer-infor";
import {  PAYMENT_METHOD, SERVICE_TYPE } from "../constants/enum";
import { QRCodeModel } from "../models/qr-code";
import { Restaurant } from "../models/restaurant/restaurant";
import { getDeviceUUID } from "../utils/helpers";
import store from "../store";
import { Delivery } from "../models/delivery";
import { Order } from "../models/order/order";
import { OrderDetail } from "../models/order/order-detail";
import { OrderResponse } from "../models/order/order-response";

export const OrderService = {
    List: async (search_key:string) => {
        const { data } = await axiosClient().get<BaseResponse<Pagination<ItemEntity[]>>>(`/public/foods/customer-order-online/menu`, {
            params: {
   
                key_search:search_key,
                restaurant_id: store.getState().restaurantData.restaurant.id,
                restaurant_brand_id: store.getState().restaurantData.brand.id,
                branch_id: store.getState().restaurantData.branch.id,

                category_type: -1,
                limit: 10000,
                page: 1,
            },
        });

        return data;
    },

 

    getLocations: async (searchKey: string) => {
        // const method = ENUM_METHOD_GET;
        const publicKey = "e7d52d87ae69b17207599267190ea5e773";
        // const publicKey = process.env.REACT_APP_KEY_MAP4D;
        const { data } = await axios
            .create({
                baseURL: `https://maps.track-asia.com/api/v1/search?lang=vi&text=${encodeURIComponent(
                    searchKey
                )}&key=${publicKey}`,
                headers: {
                    "Content-Type": "application/json",
                    projectId: 0,
                    Method: 0,
                },
                timeout: 10000,
                responseType: "json",
                withCredentials: false,
            }).get("");

        return data;
    },

    getVoucher: async () => {
        const { data } = await axiosClient().get<
            BaseResponse<Pagination<Voucher[]>>
        >(`/public/voucher`, {
            params: {
           
             
                restaurant_id: store.getState().restaurantData.restaurant.id,
                restaurant_brand_id: store.getState().restaurantData.brand.id,
                branch_id: store.getState().restaurantData.branch.id,


                key_search: "",
                total_amount: 10000,
                limit: 10000,
                page: 1,
            },
        });

        return data;
    },


    getHistory: async (userId:number) => {
        const { data } = await axiosClient().get<BaseResponse<Order[]>>(`/public/customer-order-online`, {
            params: {
                branch_id: store.getState().restaurantData.branch.id,
                fingerprint_id: userId,
            },
        });

        return data;
    },

    createOrder: async ({
        customerInfor,
        food,
        paymentMethod,
        voucher,
    }: {
        customerInfor: CustomerInfor;
        food: ItemEntity[];
        paymentMethod: PAYMENT_METHOD;
        voucher: Voucher;
    }) => {
     
        let shippingFee:number | undefined = undefined

        if (store.getState().cartData.service_type ==  SERVICE_TYPE.DELIVERY && store.getState().restaurantData.delivery.restaurant_third_party_delivery_id > 0){
            shippingFee = store.getState().restaurantData.delivery.shipping_fee
        }


        const { data } = await axiosClient().post<BaseResponse<OrderResponse>>(`/public/customer-order-online/create`,{
                fingerprint_id: customerInfor.id,
                restaurant_id: store.getState().restaurantData.restaurant.id,
                restaurant_brand_id: store.getState().restaurantData.brand.id,
                branch_id: store.getState().restaurantData.branch.id,
                shipping_fee:shippingFee,
                address: customerInfor.location.properties.label,
                customer_name: customerInfor.name,
                foods: food.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    addition_foods: item.addition_foods.filter((item) => item.select),
                    note: item.note ?? "",
                })),
                note: customerInfor.note ?? "",
                payment_method: paymentMethod,
                phone: customerInfor.phone,
                restaurant_third_party_delivery_id: store.getState().restaurantData.delivery.restaurant_third_party_delivery_id,
                shipping_lat: customerInfor.location.geometry.coordinates[1],
                shipping_lng: customerInfor.location.geometry.coordinates[0],
                voucher_id: voucher.id,
            }
        );
        return data;
    },

    cancelOrder: async (id:number) => {
        const { data } = await axiosClient().post<BaseResponse<OrderDetail>>(`/public/customer-order-online/${id}/cancel`);
        return data;
    },


    getOrderDetail: async (id:number) => {
        const { data } = await axiosClient().get<BaseResponse<OrderDetail>>(`/public/customer-order-online/${id}`);
        return data;
    },


    getQRCode: async (paymentId: number) => {
        const { data } = await axiosClient().get<BaseResponse<QRCodeModel>>(`/public/payment/${paymentId}/qr`);

        return data;
    },

    getRestaurant: async (qrCode: String) => {
        const { data } = await axiosClient().post<BaseResponse<Restaurant>>(
            `public/customer-order-online/qr-code`,
            {
                device_id: getDeviceUUID(),
                qr_code: qrCode,
                lat: 0,
                lng: 0,
            }
        );

        return data;
    },



    getEstimateFee: async ({branch_id,address,payment_method,cod,lat,lng}:{branch_id:number,address:string,payment_method:PAYMENT_METHOD,cod:number,lat:number,lng:number}) => {
        const { data } = await axiosClient().get<BaseResponse<Delivery[]>>(`public/customer-order-online/estimate-fee`,{
            params:{
              
                branch_id:branch_id,
                payment_method: payment_method.valueOf(),
                cod:cod,
                address: address,
                lat: lat,
                lng: lng,
         
            }
        });

        return data;
    },
};
