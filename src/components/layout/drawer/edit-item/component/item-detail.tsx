import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ItemEntity } from "../../../../../models/item/item";
import { formatAmount } from "../../../../../utils/helpers";
import { Image } from "../../../../custom/image";
import Checkbox from "../../../../custom/checkbox";
import { QuantityBtnGroup } from "../../../../custom/ButtonGroup";
import { ChidlrenItem } from "../../../../../models/item/item-children";


export const ItemDetail = ({ item, onChange }:
    { item: ItemEntity; onChange?: ((item: ItemEntity) => void) }
) => {
    const [data, setData] = useState<ItemEntity>(new ItemEntity())

    useEffect(() => {
        setData(item)
    }, [item])

    const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>, child: ChidlrenItem) => {
        const index = data.addition_foods.findIndex((item) => item.id == child.id)
        if (index >= 0) {
            const updatedItem = item.addition_foods.map((food, mapIndex) =>
                mapIndex === index ? { ...food, select: e.target.checked, quantity: item.quantity } : food
            );

            onChange && onChange({ ...item, addition_foods: updatedItem });
        }
    }

    const handleChangeQuantity = (child: ChidlrenItem, quantity: number) => {
        const index = data.addition_foods.findIndex((item) => item.id == child.id)
        if (index >= 0) {
            

            const updatedItem = data.addition_foods.map((food, mapIndex) => {

                let mappingItem:ChidlrenItem = { ...food, quantity: quantity }
                
                if (quantity <= 0){
                    mappingItem.quantity = 1
                    mappingItem.select = false
                }

                return mapIndex === index ? mappingItem : food
            });

                  
            onChange && onChange({ ...item, addition_foods: updatedItem });
        }
    }



    return (

        <div className="space-y-2">

            <div className="flex justify-between items-center gap-4">
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
                    <div className="flex justify-between items-end space-x-3">

                    </div>

                </div>

            </div>
      
            <div className="flex flex-col gap-5">
                {data.addition_foods.map((child, i) => {
                    return (
                        <div className="flex items-center justify-between h-8">
                            <Checkbox
                                label={
                                    <div className="space-y-[-5px]">
                                        <p>{child.name}</p>
                                        <p className="text-orange-500">{formatAmount(child.price.toString())}</p>
                                    </div>
                                }
                                checked={child.select}
                                onChange={(e) => handleChangeCheckBox(e, child)}
                            />
                            {
                                child.select &&
                                <QuantityBtnGroup
                                    quantity={child.quantity}
                                    closure={(value: number) => handleChangeQuantity(child, value)}
                                />
                            }
                        </div>

                    )
                })}
            </div>
        </div>
    )
}