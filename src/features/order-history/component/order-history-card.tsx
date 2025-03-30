import { useEffect, useState } from "react";
import { Order } from "../../../models/order/order";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/helpers";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { Image } from "../../../components/custom/image";
import { Branch } from "../../../models/branch/branch";
import { ORDER_STATUS } from "../../../constants/enum";
import { ROUTE_LINK } from "../../../routers/module-router";
import { Status } from "./order-status";

export const OrderHistoryCard = ({ input }: { input: Order }) => {

    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);
    const [branch, setBranch] = useState<Branch>(new Branch());
    const [data, setData] = useState<Order>(new Order());


    useEffect(() => {
        setData(input)

        const branch = restaurantSlice.restaurant.restaurant_brands.map((b) => b.branches).flat().find((branch) => branch.id == input.branch_id)
        if (branch) {
            setBranch(branch)
        }

    }, [input]);

    return (
        <div>
            <div className="flex rounded-b10 bg-gray-000">
                <Link to={ROUTE_LINK.PAYMENT_DETAIL + "?id=" + input.id} className="w-full h-full space-y-4">
                    <div className="">
                        <Tag className={'bg-gray-200 text-gray-600'}>
                            <span>
                                <b>{data.created_at.split(' ')[1]}</b> Ngày <b>{data.created_at.split(' ')[0]}</b>
                            </span>
                        </Tag>
                  
                        <Status status={data.customer_order_status}/>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">Mã đơn: #{

                            data.customer_order_status == ORDER_STATUS.CONFIRM && data.restaurant_third_party_delivery_id > 0 
                            ? data.third_party_delivery_order_id 
                            : data.id

                            }
                        </p>
                        <p className="font-medium">Tên khách hàng: {data.customer_name}</p>
                        <p className="font-medium">Số điện thoại: {data.phone}</p>
                        <p className="font-medium">Tổng thanh toán: {formatNumber(data.total_amount)}</p>
                    </div>
                    <div className="flex items-center">
                        <Image imageUrl={restaurantSlice.restaurant.logo} className="h-[120px] w-[120px] rounded-lg" />
                        <div className="flex-1 w-[calc(100%-64px-12px)] space-y-1">
                            <h1 className="text-base font-bold">{restaurantSlice.restaurant.name || ''}</h1>
                            <p className="text-xs">{branch.address_full_text}</p>
                        </div>
                    </div>
                </Link>
            </div>

        </div>
    )
}



