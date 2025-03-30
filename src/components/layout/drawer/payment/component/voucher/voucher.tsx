import { useSelector } from "react-redux"
import { IRootState } from "../../../../../../store"
import { Card } from "antd"
import { useDispatch } from "react-redux"
import { setOpenPaymentDrawer, setOpenVoucherDrawer } from "../../../../../../store/drawer/drawerSlice"

export const Voucher = () => {
    const dispatch = useDispatch()
    const cartSlice = useSelector((state: IRootState) => state.cartData)

    return (
        <Card title="Ưu đãi" className="shadow"
            bodyStyle={{
                padding: 0
            }}

            onClick={() => {
                dispatch(setOpenPaymentDrawer(false))
                dispatch(setOpenVoucherDrawer(true))

            
            }}
        >
     
            <div className="flex justify-between items-center p-1 h-12">
                <h2 className="text-[18px] font-medium mx-6 text-[#001416]">
                    Voucher{" "}
                    {cartSlice.voucher.id > 0 && (cartSlice.voucher.name + " (" + cartSlice.voucher.code + ")")}
                </h2>

                {cartSlice.voucher.id !== null && cartSlice.voucher.id == 0 && (
                    <i className="fa-solid fa-chevron-right pr-4"></i>
                )}
            </div>
        </Card>
    )
}