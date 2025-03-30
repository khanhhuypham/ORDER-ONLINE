import { Button,Drawer } from "antd"
import { ItemEntity } from "../../../../models/item/item"
import { addItem, editItem } from "../../../../store/cart/cartSlice";
import { QuantityBtnGroup } from "../../../../components/custom/ButtonGroup";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store";

import { formatAmount } from "../../../../utils/helpers";
import { useState, useEffect } from "react";
import {CloseOutlined} from "@ant-design/icons";
import { ItemDetail } from "./component/item-detail";
import { useDispatch } from "react-redux";
import { setOpenEditIemDrawer } from "../../../../store/drawer/drawerSlice";


export const EditItemDrawer = () => {

    const [width, setWidth] = useState<number | undefined>(undefined)
    const dispatch = useDispatch();
    const drawerSlice = useSelector((state: IRootState) => state.drawerData)
    const [data, setData] = useState<ItemEntity>(new ItemEntity())

    

    const closeDrawer = () => {
        dispatch(setOpenEditIemDrawer({ open: false }))
    };

    const calculateTotalAmount = (data:ItemEntity):number => {
        let total = data.price * data.quantity

        data.addition_foods.filter((f) => f.select).forEach((food,i) => {
            total += food.quantity * food.price
        })
        

        return total
    };


    const renderDrawerTitle = (
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Chỉnh sửa</span>
            <Button
                aria-label="close-drawer-button"
                shape="circle"
                size="large"
                icon={<CloseOutlined />}
                onClick={closeDrawer}
            />
        </div>
    );


    useEffect(() => {

        setWidth(window.innerWidth <= 640 ? window.innerWidth : undefined)
        setData(drawerSlice.openEditIemDrawer.item ?? new ItemEntity())

    }, [drawerSlice.openEditIemDrawer])


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
            zIndex={999}
            width={width}
            placement="right"
            onClose={closeDrawer}
            open={drawerSlice.openEditIemDrawer.open}
        >

            <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 py-4 px-2">
                    <ItemDetail
                        item={data} 
                        onChange={(item) => {
                            setData(item)
                        }}
                    />
                </div>


                <hr />
                <div className="flex-none shadow-lg p-5 space-y-5">

                    <div className="relative w-full">
                        <textarea
                            className="peer h-full min-h-[50px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-[16px] font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={data.note} 
                            onChange={(e) => {
                                setData({ ...data, note: e.target.value.slice(0, 256) })
                            }}
                            ></textarea>
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Ghi chú
                        </label>
                    </div>


                    <div className="flex justify-between items-center text-lg font-semibold">
                        <QuantityBtnGroup quantity={data.quantity} closure={(value: number) => {
                            setData({ ...data, quantity: value })
                        }} />
                        <span>{formatAmount(calculateTotalAmount(data).toString())}</span>
                    </div>

                    <div >
                        <button className="w-full py-2 rounded-3xl text-lg bg-orange-500 text-white border-none"
                            onClick={() => {
                     
                                if (drawerSlice.openEditIemDrawer.index == undefined){
                                    if (data.quantity > 0){
                                        dispatch(addItem(data))
                                    }
                                }else{
                                    dispatch(editItem({index:drawerSlice.openEditIemDrawer.index,item:data}))
                                }

                                closeDrawer()
                            }}
                        >
                            Cập nhật giỏ hàng
                        </button>
                    </div>

                </div>


            </div>
        </Drawer>

    );
};






