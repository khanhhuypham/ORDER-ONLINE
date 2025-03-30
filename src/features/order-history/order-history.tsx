import { Button, List, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_LINK } from "../../routers/module-router";
import { IRootState } from "../../store";
import { useSelector } from "react-redux";
import { OrderService } from "../../services/OrderService";
import { Order } from "../../models/order/order";
import { OrderHistoryCard } from "./component/order-history-card";


export const OrderHistoryPage = () => {
    const navigate = useNavigate()
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData)
    const userSlice = useSelector((state: IRootState) => state.userData)

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Order[]>([]);


    const getOrderHistory = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        OrderService.getHistory(userSlice.user.id).then((res) => {
            if (res.status == 200) {
                setData([...data, ...res.data]);
                setLoading(false);
            } else {
                setLoading(false);
                message.error(res.message)
            }
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        });

    }

    useEffect(() => {
        getOrderHistory()
    }, []);


    return (
        <div className="relative">
            <div className="sticky top-0 h-10 bg-white shadow z-100">
                <Button 
                    type="text" 
                    className="h-full"
                    icon={<i className="fa-solid fa-chevron-left"></i>}
                    onClick={() => {
                        navigate(ROUTE_LINK.ORDER + "?qr_code=" + restaurantSlice.qr_code)
                    }}
                >
                    <span className="text-base">Chi tiết đơn hàng</span>
                </Button>

            </div>

            <div className="z-2 p-4">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item key={item.id}>
                            <OrderHistoryCard input={item} />
                        </List.Item>
                    )}
                />
            </div>

        </div>
    );
};
