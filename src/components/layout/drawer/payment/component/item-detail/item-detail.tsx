import { Button, Card, List } from "antd"
import { useSelector } from "react-redux"
import { IRootState } from "../../../../../../store"
import { ItemEntity } from "../../../../../../models/item/item"
import { removeItemFromCart } from "../../../../../../store/cart/cartSlice"
import { formatAmount } from "../../../../../../utils/helpers"
import { useDispatch } from "react-redux"
import { setOpenEditIemDrawer, setOpenPaymentDrawer } from "../../../../../../store/drawer/drawerSlice"
import { SERVICE_TYPE } from "../../../../../../constants/enum"
import { useEffect, useState } from "react"

export const OrderDetail = () => {

    const dispatch = useDispatch()
    const cartSlice = useSelector((state: IRootState) => state.cartData)
    const [voucherAmount, setVoucherAmount] = useState(0);


    useEffect(() => {

        const voucher = cartSlice.voucher

        if (voucher.id > 0) {

            const totalAmount = cartSlice.items.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0)

            if (voucher.discount_amount > 0) {
                setVoucherAmount(voucher.discount_amount)
            } else if (voucher.discount_percent > 0) {

                let discount = totalAmount * voucher.discount_percent * 0.01
                if (discount >= voucher.max_discount_amount) {
                    discount = voucher.max_discount_amount

                }


                setVoucherAmount(discount)
            }

        }

    }, [cartSlice.voucher, cartSlice.items])


    const ItemInfor = (
        { item, onEdit, onDelete }:
            { item: ItemEntity; onEdit?: (item: ItemEntity) => void; onDelete?: () => void }
    ) => {

        return (

            <div className="space-y-1">

                <div className="flex justify-between text-sm">

                    <div className="space-x-1">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-orange-500">x {item.quantity}</span>
                    </div>


                    <Button type="text" color="danger" variant="filled" onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onDelete && onDelete()
                        // dispatch(removeItemFromCart(item))
                    }} icon={<i className="fa-solid fa-trash"></i>} />

                </div>


                <div>
                    {item.food_in_combo.map((child, i) => {
                        return <p key={i} className="text-xs">+ {child.name} <span className="text-orange-500">x {child.combo_quantity}</span></p>
                    })}


                    {item.addition_foods.filter((f) => f.select).map((child, i) => {
                        return <p key={i}>+ {child.name} <span className="text-orange-500">x {child.quantity}</span></p>
                    })}
                </div>


                {
                    item.note && (
                        <div className="space-x-2 text-xs">
                            <span><i className="fa-regular fa-file-lines text-orange-500"></i></span>
                            <span className="text-gray-600">{item.note}</span>
                        </div>
                    )
                }

                <div className="flex items-center justify-between">
                    <Button type="text" className="-translate-x-4" icon={<i className="fa-solid fa-pen-to-square"></i>}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            onEdit && onEdit(item)

                        }}
                    >Sửa món</Button>
                    <p className="font-normal">
                        {formatAmount(item.price.toString())}
                    </p>

                </div>



            </div>

        )
    }

    return (
        <Card title="Chi tiết đơn hàng" className="shadow"
            bodyStyle={{
                padding: 0
            }}
        >

            <List
                // className="flex-1 overflow-y-auto"
                dataSource={cartSlice.items}
                size="large"
                renderItem={(item, index) => (
                    <List.Item>
                        <div className="w-full">
                            <ItemInfor item={item} key={index}
                                onDelete={() => {
                                    dispatch(removeItemFromCart(index))
                                }}

                                onEdit={(item: ItemEntity) => {
                                    dispatch(setOpenEditIemDrawer({ open: true, index: index, item: item }))
                                }}
                            />
                        </div>
                    </List.Item>
                )}
            />
            <hr />
            <div className="pl-16 pr-2 py-2">
                <div className="flex justify-between text-base">
                    <span>Tổng giá món: </span>
                    <span>{formatAmount(cartSlice.totalAmount.toString())}</span>
                </div>

                {
                    cartSlice.service_type == SERVICE_TYPE.DELIVERY &&
                    <div className="flex justify-between text-base">
                        <span>Phí giao hàng: </span>
                        <span>{formatAmount((cartSlice.shippingFee ?? 0).toString())}</span>
                    </div>

                }

                {
                    cartSlice.voucher.id > 0 &&
                    <div className="flex justify-between text-base">
                        <span>Ưu đãi: </span>
                        <span>{formatAmount(voucherAmount.toString())}</span>
                    </div>
                }



                <div className="flex justify-between text-lg">
                    <span>Tổng tạm tính: </span>
                    <span className="font-semibold">{formatAmount(cartSlice.netAmount.toString())}</span>
                </div>
            </div>

        </Card>
    )
}