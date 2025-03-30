import { Button, Card } from "antd"

import { ItemEntity } from "../../../../../models/item/item"
import { editItem, removeItemFromCart } from "../../../../../store/cart/cartSlice";
import { QuantityBtnGroup } from "../../../../custom/ButtonGroup";


import { formatAmount } from "../../../../../utils/helpers";
import { useEffect } from "react";


export const ItemInfor = (
    { item, onEdit, onDelete, onClick }:
        { item: ItemEntity; onEdit?: (item: ItemEntity) => void; onDelete?: () => void; onClick?: (item: ItemEntity) => void }
) => {



    useEffect(() => {

    }, [item])


    return (

        <div className="space-y-2"
            onClick={() => onClick && onClick(item)}
        >

            <div className="flex justify-between text-sm">
                <h1 className="font-semibold">{item.name}</h1>

                <p className="font-normal">
                    {formatAmount(item.price.toString())}
                </p>

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


            <div className="flex justify-between items-end space-x-3">
                <div>
                    <QuantityBtnGroup quantity={item.quantity} closure={(value: number) => {

                        const newItem = { ...item, quantity: value }
                        onEdit && onEdit(newItem)

                    }} />
                </div>

                <div>

                    <Button type="text" color="danger" variant="filled" onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onDelete && onDelete()

                    }}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                </div>

            </div>


        </div>

    )
}