import { Link } from "react-router-dom";
import footerImg from "../../assets/images/image_footer.png";
import { ROUTE_LINK } from "../../routers/module-router";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
const Footers = () => {
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);

    return (
        <footer className="relative bg-[#151515] text-white">
            <div className="container mx-auto pt-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="py-4 p-0 md:py-8 md:px-4 md:col-span-2">
                        <h2 className="sm:text-xl text-[#FCFBFA] text-sm font-bold sm:text-left text-justify mb-6 flex items-center uppercase">
                            {restaurantSlice.restaurant.name}
                        </h2>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <i className="fa-solid fa-location-dot text-2xl text-orange-500"></i>
                                <span className="text-[#FCFBFA] md:text-base overflow-hidden text-ellipsis">
                                    {restaurantSlice.branch.address_full_text}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <i className="fa-solid fa-phone text-2xl text-orange-500"></i>
                                <span className="text-[#FCFBFA] md:text-base overflow-hidden text-ellipsis">
                                    {restaurantSlice.branch.phone_number}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="py-4 p-0 md:py-8 md:px-4">
                        <h2 className="sm:text-xl text-[#FCFBFA] text-sm font-bold sm:text-left text-justify mb-6 flex items-center uppercase">
                            Thông tin
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Link
                                    to={ROUTE_LINK.ORDER}
                                    className="text-[#FCFBFA] md:text-base overflow-hidden text-ellipsis"
                                >
                                    Điều kiện giao dịch
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                   to={ROUTE_LINK.ORDER}
                                    className="text-[#FCFBFA] md:text-base overflow-hidden text-ellipsis"
                                >
                                    Chính sách giao hàng
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    to={ROUTE_LINK.ORDER}
                                    className="text-[#FCFBFA] md:text-base overflow-hidden text-ellipsis"
                                >
                                    Điều khoản bảo mật
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    to={ROUTE_LINK.ORDER}
                                    className="text-[#FCFBFA] md:text-base overflow-hidden text-ellipsis"
                                >
                                    Phương thức thanh toán
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="py-4 p-0 md:py-8 md:px-4">
                        <h2 className="sm:text-xl text-[#FCFBFA] text-sm font-normal sm:text-left text-justify mb-6 flex items-center uppercase">
                            Cảm ơn bạn!
                        </h2>

                        <p className="text-[#FCFBFA] md:text-base">
                            Để ghé thăm website của quán
                        </p>

                        <button className="mt-6 px-6 py-2 bg-[#F36A0F] text-[#FCFBFA] uppercase rounded-[34px]">
                            Liên hệ Techres
                        </button>
                    </div>

                    <img
                        src={footerImg}
                        alt="Footer Img"
                        className="absolute z-10 right-0 bottom-4 max-w-[150px] md:max-w-[300px]"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footers;
