import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { Button, Card } from "antd";
import { Image } from "../../../components/custom/image";
import { useNavigate } from "react-router-dom";
import { ROUTE_LINK } from "../../../routers/module-router";
import IconArrowLeft from "../../../components/icons/icon-arrow";

export const RestaurantInforCard = ({ onClick }: { onClick?: ((type: number) => void) }) => {

    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);
    const navigate = useNavigate()
    const Title = () => {
        return (
            <div className="flex justify-between items-center gap-2 h-full">
                <div>
                    <p className="break-all">
                        {restaurantSlice.restaurant.name}
                    </p>
                </div>

                <div className="w-22">
                    <Button
                        type="text"
                        onClick={() => navigate(ROUTE_LINK.ORDE_HISTORY)}
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-semibole"> Lịch sử đơn hàng</span>
                            <IconArrowLeft />
                        </div>

                    </Button>

                </div>


            </div>
        )
    }


    return (
        <div className="relative flex justify-center items-center py-2 w-full h-full" >

            <Image imageUrl={restaurantSlice.restaurant.banner} defaultImg="" className="h-[250px] md:h-[300px] lg:h-[500px] w-full" />

            <Card
                title={<Title />}
                className="absolute bottom-[-80px] w-[300px] md:w-[500px] lg:w-[800px] shadow-lg"
                bodyStyle={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 0,
                    paddingRight: 0
                }}
            >
                <div className="space-y-4">

                    <div className="flex items-center justify-between gap-2 h-full px-5"
                        onClick={() => onClick && onClick(1)}
                    >
                        <div className="flex items-center gap-2 w-full">
                            <span className="text-xl w-5 text-blue-500">
                                <i className="fa-solid fa-house"></i>
                            </span>
                            {
                                restaurantSlice.brand.name.length > 0
                                    ? <span> {restaurantSlice.brand.name}</span>
                                    : <span>Vui lòng chọn thương hiệu</span>
                            }

                        </div>
                        <span><i className="fa-solid fa-chevron-right"></i></span>

                    </div>

                    <hr />

                    <div className="flex items-center justify-between gap-2 h-full px-5"
                        onClick={() => onClick && onClick(2)}
                    >
                        <div className="flex items-center gap-2 w-full ">
                            <span className="text-center text-xl w-5 text-orange-600">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>

                            {
                                restaurantSlice.branch.name.length > 0
                                    ?
                                    (
                                        <div className="flex flex-col gap-1 ">
                                            <span className="font-semibold text-base"> {restaurantSlice.branch.name}</span>
                                            <span>{restaurantSlice.branch.street_name}</span>
                                        </div>
                                    )
                                    : <span>Vui lòng chọn chi nhánh</span>
                            }

                        </div>

                        <span><i className="fa-solid fa-chevron-right"></i></span>
                    </div>
                </div>
            </Card>
        </div>
    )
}