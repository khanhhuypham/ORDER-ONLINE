import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import IconSearch from "../icons/icon-search";
import ImageDefault from "../../assets/images/food-default.jpg";
import shoppingCartIcon from "../../assets/images/shopping-cart.png";
import { Badge } from "antd";
import { setSearchKey } from "../../store/restaurant/restaurantSlice";
import useDebounce from "../../hooks/useDebounce";
import { useState } from "react";


export const Header = ({ onClick }: { onClick?: (() => void) }) => {
    const dispatch = useDispatch();
    const restaurant = useSelector((state: IRootState) => state.restaurantData.restaurant);
    const cartSlice = useSelector((state: IRootState) => state.cartData)
    const [searchTerm, setSearchTerm] = useState('');

    
    useDebounce(() => {
        dispatch(setSearchKey(searchTerm))
    }, 300, [searchTerm]); // Debounce with 300ms delay

 

    return (
        <header className="sticky top-0"
            style={{ zIndex: 10 }}
        >
            <div className=" bg-[#00141680] h-[70px] px-4">
                <div className="container mx-auto flex items-center justify-between h-full">

                    <div className="hidden md:flex items-center">
                        <img
                            src={process.env.REACT_APP_RESOURCE_DOMAIN_URL + restaurant.logo}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = ImageDefault;
                            }}
                            className="w-12 h-12 object-cover mr-2 rounded-full cursor-pointer"
                            alt="Restaurant Logo"
                        />
                    </div>

                    <div className="flex-1 flex justify-end gap-2 md:gap-8">

                        <div className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-md">
                            <IconSearch className="ml-2 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tên, mã sản phẩm"
                                className="px-2 py-2 w-full focus:outline-none"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                }}
                            />
                        </div>


                        <div
                            className="relative flex items-center cursor-pointer"
                            onClick={onClick}
                        >
                            <Badge count={cartSlice.items.length}>
                                <img
                                    src={shoppingCartIcon}
                                    alt=""
                                    className="object-cover"
                                />
                            </Badge>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
