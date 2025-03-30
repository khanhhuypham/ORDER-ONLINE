import { ItemEntity } from "../../models/item/item";
import { formatAmount } from "../../utils/helpers";
import defaultImage from "../../assets/images/food-default.jpg"
import { Image } from "../../components/custom/image";


export const ItemCard = ({ item }:
    { item: ItemEntity }
) => {

    return (

        <div className="flex justify-between items-center gap-4">
            <div className="h-full w-[100px]">
                <Image imageUrl={item.avatar} className="h-full w-full rounded-lg" />
            </div>

            <div className="flex-1 h-full p-1">
                <h1 className="">{item.food_name} x {item.quantity}</h1>

                {item.customer_order_detail_combo.map((child, i) => {
                    return <p key={i}>+ {child.name} <span className="text-orange-500">x {child.combo_quantity}</span></p>
                })}

                {item.customer_order_detail_addition.map((child, i) => {
                    return <p key={i}>+ {child.name} <span className="text-orange-500">x {child.quantity}</span></p>
                })}

                <p className="font-medium text-lg text-orange-500">
                    {formatAmount(item.price.toString())}
                </p>
                {
                    item.note && (
                        <div className="space-x-2 text-xs">
                            <span><i className="fa-regular fa-file-lines text-orange-500"></i></span>
                            <span className="text-gray-600">{item.note}</span>
                        </div>
                    )
                }

            </div>

            <p>{formatAmount((item.price * item.quantity).toString())}</p>
        </div>

    )
}