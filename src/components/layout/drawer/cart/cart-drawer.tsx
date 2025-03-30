
import { Button, Card, Drawer, DrawerProps, Input, InputNumber, List, message, Select, Space } from "antd";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import { CloseOutlined, } from "@ant-design/icons";
import { ItemEntity } from "../../../../models/item/item";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store";
import { useDispatch } from "react-redux";
import { formatAmount } from "../../../../utils/helpers";
import { editItem, removeAllItemsFromCart, removeItemFromCart } from "../../../../store/cart/cartSlice";
import { ItemInfor } from "./component/item-infor";
import { setOpenCartDrawer, setOpenEditIemDrawer } from "../../../../store/drawer/drawerSlice";




export const CartDrawer = (
    { openDrawer, setOpenDrawer, onProcess }:
        {
            openDrawer: boolean;
            setOpenDrawer: Dispatch<SetStateAction<boolean>>;
            onProcess?: (() => void)
        }
) => {

    const [width, setWidth] = useState<number | undefined>(undefined)
    const dispatch = useDispatch()
    const cartSlice = useSelector((state: IRootState) => state.cartData)
    const [data, setData] = useState<ItemEntity[]>([])
   

    useEffect(() => {
    
        setWidth(window.innerWidth <= 640 ? window.innerWidth : undefined)
    }, [])



    const closeDrawer = () => {
        setOpenDrawer(false);
    };


    const renderDrawerTitle = (
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Giỏ hàng của bạn</span>
            <Button
                aria-label="close-drawer-button"
                shape="circle"
                size="large"
                icon={<CloseOutlined />}
                onClick={closeDrawer}
            />
        </div>
    );


    const RenderCostFooter = () => {
     
        return (
            <div className="shadow-lg p-4 space-y-2">

                <div className="flex justify-between text-lg font-semibold">

                    <span>
                        Tổng cộng
                    </span>
                    <span className="text-orange-500">
                        {formatAmount(cartSlice.totalAmount.toString())}
                    </span>
                </div>

                <div >

                    <button onClick={() => {
                        if (cartSlice.items.length == 0) {
                            message.warning("Vui lòng chọn món trước khi thanh toán")
                        } else {
                            onProcess && onProcess()
                        }
                    }} className="w-full py-2 rounded-3xl text-lg bg-orange-500 text-white border-none">
                        Tiến hành đặt đơn
                    </button>
                </div>
            </div>
        )
    }


    useEffect(() => {
        setData(cartSlice.items)
    }, [openDrawer, cartSlice])


    return (

        <Drawer
            closable={false}
            title={renderDrawerTitle}
            styles={{
                header: {},
                body: {
                    padding: "0px",
                },
            }}
            zIndex={996}
            width={width}
            placement="right"
            onClose={closeDrawer}
            open={openDrawer}
        >

            <>
                <div className="h-full flex flex-col">
                    <div className="h-10">
                        <div className="flex justify-between items-center pl-5 h-full">
                            <span className="font-semibold text-lg">Tóm tắt đơn hàng</span>
                            <Button danger type="text"
                                onClick={() => {
                                    dispatch(removeAllItemsFromCart())
                                }}
                            >Xoá tất cả</Button>
                        </div>
                        <hr />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-4 py-4 px-2">

                        <List
                            // className="flex-1 overflow-y-auto"
                            dataSource={data}
                            size="large"
                            renderItem={(item, index) => (
                                <List.Item>
                                    <div className="w-full">
                                        <ItemInfor item={item} key={index} 
                                            onDelete = {() =>{
                                                dispatch(removeItemFromCart(index))
                                            }}

                                            onEdit = {(item:ItemEntity) => {
                                                dispatch(editItem({ index:index,item:item }))
                                            }}

                                            onClick={(item:ItemEntity) => {
                                                // dispatch(setOpenCartDrawer(false))
                                                dispatch(setOpenEditIemDrawer({ open: true,index:index,item: item }))
                                            }}
                                        />
                                    </div>
                                </List.Item>
                            )}
                            locale={{ emptyText: <button className="text-orange-500" onClick={closeDrawer}>+ Thêm món</button> }}
                        />

                    </div>


                    <div className="flex-none">
                        <hr />
                        <RenderCostFooter />
                    </div>

                </div>

            </>
        </Drawer>

    );
};






