import { Button, Card, message } from "antd"

import { ItemEntity } from "../../../models/item/item"
import { addItem } from "../../../store/cart/cartSlice";

import { useDispatch } from "react-redux";
import { formatAmount, generateRandomNumber } from "../../../utils/helpers";

import { setOpenEditIemDrawer } from "../../../store/drawer/drawerSlice";
import { Image } from "../../../components/custom/image";

export const OrderCard = ({ item }: { item: ItemEntity }) => {

    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage({ maxCount: 3 });

    return (
        <>
             {contextHolder}

             <Card
            hoverable
            className="w-full drop-shadow-md"
            styles={{
                body: {
                    padding: "12px 15px",
                }
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                dispatch(setOpenEditIemDrawer({ open: true, item: { ...item, note: "", quantity: 1 } }))
            }}
        >
            <div className="flex justify-between gap-4">
                <div className="h-full w-[100px]">
                    <Image imageUrl={item.avatar} className="h-full w-full rounded-lg" />
                </div>

                <div className="flex-1 h-full">
                    <h1 className="text-xl font-semibold">{item.name}</h1>


                    {item.food_in_combo.map((child, i) => {
                        return <p key={i}>+ {child.name} <span className="text-orange-500">x {child.combo_quantity}</span></p>
                    })}

                    <p className="font-medium text-lg text-orange-500">
                        {formatAmount(item.price.toString())}
                    </p>
                    <div className="flex justify-end space-x-3">

                        <div>
                            <Button type="text" color="default" variant="filled" onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                dispatch(addItem({ ...item, note: "", quantity: 1 }))
                                // messageApi.op("Thêm vào giỏ hàng thành công")

                                messageApi.success("Thêm vào giỏ hàng thành công");

                            }}>
                                <i className="fa-solid fa-cart-arrow-down"></i>
                            </Button>

                        </div>

                    </div>

                </div>
            </div>


        </Card>
        </>
      
    )
}