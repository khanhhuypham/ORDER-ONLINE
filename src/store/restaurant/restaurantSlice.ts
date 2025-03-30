import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "../../models/restaurant/restaurant";
import { Brand } from "../../models/brand/brand";
import { Branch } from "../../models/branch/branch";
import { Delivery } from "../../models/delivery";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../../constants/cookie-key";



// Retrieve the user from cookies and parse it safely
const storedQRCODE = Cookies.get(COOKIE_KEYS.QRCODE);
// Retrieve the user from cookies and parse it safely
const storedRestaurant = Cookies.get(COOKIE_KEYS.RESTAURANT);
// Retrieve the brand from cookies and parse it safely
const storedBrand = Cookies.get(COOKIE_KEYS.BRAND);
// Retrieve the branch from cookies and parse it safely
const storedBranch = Cookies.get(COOKIE_KEYS.BRANCH);


const initialState = {
    qr_code:storedQRCODE ? (JSON.parse(storedQRCODE) as string) : "",
    restaurant: storedRestaurant ? (JSON.parse(storedRestaurant) as Restaurant) : new Restaurant(),
    brand: storedBrand ? (JSON.parse(storedBrand) as Brand) : new Brand(), // selected brand from user
    branch: storedBranch ? (JSON.parse(storedBranch) as Branch) : new Branch(), // selected branch from user
    search_key: "",
    delivery:new Delivery()
};


export const restaurantSlice = createSlice({
    name: "restaurant",
    initialState: initialState,
    reducers: {
        setQRCode(state, action: PayloadAction<string>) {
            state.qr_code = action.payload;
            Cookies.set(COOKIE_KEYS.QRCODE,JSON.stringify(action.payload), { expires: 24 * 60 * 60 });
        },

        setRestaurant(state, action: PayloadAction<Restaurant>) {
            state.restaurant = action.payload;
            Cookies.set(COOKIE_KEYS.RESTAURANT,JSON.stringify(action.payload), { expires: 24 * 60 * 60 });
        },
        
        setBrand(state, action: PayloadAction<Brand>) {
            state.brand = action.payload;
            Cookies.set(COOKIE_KEYS.BRAND,JSON.stringify(action.payload), { expires: 24 * 60 * 60 });
        },

        setBranch(state,action: PayloadAction<Branch>) {
            state.branch = action.payload;
            Cookies.set(COOKIE_KEYS.BRANCH,JSON.stringify(action.payload), { expires: 24 * 60 * 60 });
        },

        setSearchKey(state,action: PayloadAction<string>) {
            state.search_key = action.payload;
        },

        setDelivery(state, action: PayloadAction<Delivery>) {
            state.delivery = action.payload;
        },
    },
});

export const { setQRCode,setRestaurant,setBrand,setBranch,setSearchKey,setDelivery } = restaurantSlice.actions;


