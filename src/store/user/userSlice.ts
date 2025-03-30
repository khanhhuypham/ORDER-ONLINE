import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { CustomerInfor } from "../../models/customer-infor";
import { COOKIE_KEYS } from "../../constants/cookie-key";

export interface IUserState {
    user: CustomerInfor;
}

// Retrieve the user from cookies and parse it safely
const storedUser = Cookies.get(COOKIE_KEYS.USER);

console.log(storedUser)
const initialState: IUserState = {
    user: storedUser ? (JSON.parse(storedUser) as CustomerInfor) : new CustomerInfor(),
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: IUserState, action: PayloadAction<CustomerInfor>) => {
            
            Cookies.set(COOKIE_KEYS.USER,JSON.stringify(action.payload), { expires: 24 * 60 * 60 });
            state.user = action.payload;
        },

        removeUser: (state: IUserState) => {
            Cookies.remove(COOKIE_KEYS.USER);
            state.user = new CustomerInfor();
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
