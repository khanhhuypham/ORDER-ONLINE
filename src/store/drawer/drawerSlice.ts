import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemEntity } from "../../models/item/item";

export interface IDrawerState {
    openEditIemDrawer: {open:boolean,index?:number,item?:ItemEntity};
    openCartDrawer: boolean;
    openPaymentDrawer: boolean;
    openVoucherDrawer: boolean;
}

const initialState: IDrawerState = {
    openEditIemDrawer: {open:false},
    openCartDrawer: false,
    openPaymentDrawer: false,
    openVoucherDrawer: false,
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setOpenEditIemDrawer: (state: IDrawerState,action: PayloadAction<{open:boolean,index?:number,item?:ItemEntity}>) => {
            state.openEditIemDrawer = action.payload
        },

        setOpenCartDrawer: (state: IDrawerState,action: PayloadAction<boolean>) => {
            state.openCartDrawer = action.payload
        },

        setOpenPaymentDrawer: (state: IDrawerState,action: PayloadAction<boolean>) => {
            state.openPaymentDrawer = action.payload
        },

        setOpenVoucherDrawer: (state: IDrawerState,action: PayloadAction<boolean>) => {
            state.openVoucherDrawer = action.payload
        },
    },
});

export const {setOpenEditIemDrawer, setOpenCartDrawer,setOpenPaymentDrawer,setOpenVoucherDrawer} = drawerSlice.actions;
