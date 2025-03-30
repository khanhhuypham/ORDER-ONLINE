import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { Input, List } from "antd";
import IconSearch from "../../../components/icons/icon-search";
import { useEffect, useState } from "react";
import { Brand } from "../../../models/brand/brand";
import { Branch } from "../../../models/branch/branch";
import { useDispatch } from "react-redux";
import { setBranch, setBrand } from "../../../store/restaurant/restaurantSlice";
import { clearCart, setShipFee } from "../../../store/cart/cartSlice";

export const ModalOfChoosingBranch = ({ type, onClose }: { type: number, onClose?: (() => void) }) => {
    const dispatch = useDispatch();
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);


    const [listType, setListType] = useState<number>(type)
    const [brands, setBrands] = useState<Brand[]>([])
    const [branches, setBranches] = useState<Branch[]>([])

    useEffect(() => {

        setListType(type)
        setBrands(restaurantSlice.restaurant.restaurant_brands)
        setBranches(restaurantSlice.restaurant.restaurant_brands.filter((brand) => brand.id == restaurantSlice.brand.id).map((brand) => brand.branches).flat())
    }, [type])



    return (
        <div>
            <div className="">
                <p className="p-4 bg-orange-500 text-lg text-white text-center font-medium">

                    {
                        listType == 1
                            ? "Vui lòng chọn thương hiệu"
                            : "Vui lòng chọn chi nhánh"
                    }
                </p>
            </div>


            <div className="p-2">
                <div className="px-8">
                    <Input size="large" className="rounded-3xl  hover:bg-gray-100 bg-gray-100" placeholder="Tìm kiếm" prefix={<IconSearch className="ml-2 w-4 h-4" />} />
                </div>

                {
                    listType == 1
                        ?
                        (
                            <List
                                dataSource={brands}
                                size="large"
                                renderItem={(brand, index) => (
                                    <List.Item
                                        onClick={() => {
                                            dispatch(setBrand(brand))
                                            dispatch(setShipFee(brand.setting?.shipping_fee_amount ?? 0))
                                            dispatch(clearCart())
                                            setBranches(brand.branches)
                                            setListType(2)
                                            // onClose && onClose()
                                        }}
                                    >
                                        <div className="w-full flex justify-between items-center ">
                                            <div className="space-x-2">
                                                <span className="text-center text-xl w-5 text-blue-500">
                                                    <i className="fa-solid fa-house"></i>
                                                </span>
                                                <span>{brand.name}</span>
                                            </div>

                                            {
                                                restaurantSlice.brand.id == brand.id && <span><i className="fa-solid fa-check text-green-500"></i></span>
                                            }


                                        </div>
                                    </List.Item>
                                )}
                            />
                        )
                        :
                        (
                            <List
                                dataSource={branches}
                                size="large"
                                renderItem={(branch, index) => (
                                    <List.Item
                                        onClick={() => {

                                            dispatch(setBranch(branch))
                                            dispatch(clearCart())
                                            onClose && onClose()
                                        }}
                                    >

                                        <div className="w-full flex justify-between items-center gap-4 ">
                                            <div className="flex items-center gap-4">
                                                <span className=" text-xl w-5 text-green-500">
                                                    <i className="fa-solid fa-location-dot"></i>
                                                </span>
                                                <div className="flex flex-col gap-1 ">
                                                    <span className="font-semibold text-base"> {branch.name}</span>
                                                    <span>{branch.street_name}</span>
                                                </div>
                                               
                                            </div>


                                            {
                                                restaurantSlice.branch.id == branch.id && <span><i className="fa-solid fa-check text-green-500"></i></span>
                                            }

                                        </div>
                                    </List.Item>
                                )}
                            />
                        )
                }
            </div>




        </div>
    )
}