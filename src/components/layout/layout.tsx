import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Header } from "./header";
// import Sidebar from "./side-bar";
import Footers from "./footer";

import { VoucherDrawer } from "./drawer/voucher/voucher-list";
import { setOpenPaymentDrawer } from "../../store/drawer/drawerSlice";
import { CartDrawer } from "./drawer/cart/cart-drawer";
import { PaymentDrawer } from "./drawer/payment/payment-drawer";
import { EditItemDrawer } from "./drawer/edit-item/edit-item";
import { IRootState } from "../../store";


export const Layout = () => {
    const dispatch = useDispatch();
    const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);

    const drawerSlice = useSelector((state: IRootState) => state.drawerData)

    return (
        <div>
            <div className="relative">


                <div className={` min-h-screen`}>


                    <div className="main-content flex flex-col min-h-screen">

                        <Header onClick={() => { setOpenCartDrawer(true) }} />

                        <Suspense>
                            <div className=" bg-[#FFF4EE]">
                                <Outlet />
                            </div>
                        </Suspense>

                        <Footers />
                    </div>

                    <VoucherDrawer />

                    <CartDrawer openDrawer={openCartDrawer} setOpenDrawer={setOpenCartDrawer} onProcess={() => {
                        setOpenCartDrawer(false)
                        dispatch(setOpenPaymentDrawer(true))
                    }} />
                    
                    <PaymentDrawer />
                  

                    <EditItemDrawer />


                </div>
            </div>
        </div>
    );
};
