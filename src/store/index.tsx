import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./themeConfigSlice";

import { loadingSlice } from "./loadingSlice";
import { restaurantSlice } from "./restaurant/restaurantSlice";
import { cartSlice } from "./cart/cartSlice";
import { userSlice } from "./user/userSlice";
import { drawerSlice } from "./drawer/drawerSlice";

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    userData: userSlice.reducer,
    loadingData: loadingSlice.reducer,
    restaurantData:restaurantSlice.reducer,
    cartData:cartSlice.reducer,
    drawerData:drawerSlice.reducer
});
export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
// // Define RootState type
// export type RootState = ReturnType<typeof rootReducer>;