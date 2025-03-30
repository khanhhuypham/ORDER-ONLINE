import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, Card, Empty, message, Modal } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { ItemEntity } from "../../models/item/item";

import { OrderCard } from "./component/OrderCard";
import { Category } from "../../models/category/category";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { OrderService } from "../../services/OrderService";
import { PopupInterface } from "../../constants/popup-interface";
import { useDispatch } from "react-redux";
import { setBranch, setBrand, setQRCode, setRestaurant } from "../../store/restaurant/restaurantSlice";
import { ModalOfChoosingBranch } from "./component/choose-branch-modal";
import { RestaurantInforCard } from "./component/restaurant-infor-card";
import { useSearchParams } from "react-router-dom";
import { setShipFee } from "../../store/cart/cartSlice";




export interface ItemListProps {
    data: ItemEntity[]
    page: number
    limit: number
    total_record: number
    search_key?: string
}


export const Order = () => {
    const [searchParams] = useSearchParams();

    let sliderRef = useRef<Slider | null>(null)
    const [categories, setCategories] = useState<Category[]>([]);
    const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const dispatch = useDispatch();
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);
    const cartSlice = useSelector((state: IRootState) => state.cartData);
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "" });

    const [parameter, setParameter] = useState<ItemListProps>({
        data: [],
        search_key: "",
        page: 1,
        limit: 200,
        total_record: 0
    });



    const handleCategoryClick = (categoryId: number) => {

        setCategories((prevCategories) =>
            prevCategories.map((item) => item.id === categoryId ? { ...item, select: true } : { ...item, select: false })
        );

        // Scroll to the corresponding category section
        if (categoryRefs.current[categoryId]) {
            categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const showModal = (type: number) => {
        let component = <ModalOfChoosingBranch type={type} onClose={() => setDialog({ ...dialog, open: false })} />
        setDialog({ open: true, content: component, title: "" })
    }


    const getRestaurant = () => {
        const qrCode = searchParams.get("qr_code");

        OrderService.getRestaurant(qrCode ?? "").then((res) => {
            if (res.status == 200) {


                const restaurant = res.data
                dispatch(setRestaurant(restaurant))
                dispatch(setQRCode(qrCode ?? ""))

                console.log("1")

                if (restaurant.restaurant_brands.length == 1) {
                    const brand = restaurant.restaurant_brands[0]
                    dispatch(setBrand(brand))
                    dispatch(setShipFee(brand.setting?.shipping_fee_amount ?? 0))
                }

                if (restaurant.restaurant_brands.length == 1 && restaurant.restaurant_brands[0].branches.length > 0) {
                    const branch = restaurant.restaurant_brands[0].branches[0]
                    dispatch(setBranch(branch))
                }

            } else {
                message.error(res.message)
            }
        }).catch((error) => {
            console.log(error);
        });

    };


    const getItems = (key: string) => {

        OrderService.List(key).then((res) => {
            if (res.status == 200) {
                setCategories(getCategoryFromListFood(res.data.list))
                let data = res.data.list.map((item) => ({ ...item, quantity: 1 }))

                // for (var index in data) {

                //     if(data[index].food_addition_ids.length > 0){
    
                //         data[index].addition_foods = data[index].addition_foods.map((item) => ({...item,select:false}))
                //     }
                    
                // }


                setParameter({ ...parameter, data: data })
            } else {
                message.error(res.message)
                console.log(res.message);
            }
        }).catch((error) => {
            console.log(error);
        });

    };


    const getCategoryFromListFood = (data: ItemEntity[]) => {


        return data.reduce((uniqueCategories, item) => {
            if (!uniqueCategories.some((category) => category.id === item.category_id)) {
                uniqueCategories.push({
                    id: item.category_id,
                    name: item.category_name,
                    active: true,
                    select: false,
                });
            }
            return uniqueCategories;


        }, [] as Category[]);

    };

    useEffect(() => {
        getRestaurant()
    }, []);

    useEffect(() => {

        if (restaurantSlice.branch.id > 0) {
            getItems(restaurantSlice.search_key)
        }

    }, [restaurantSlice.branch, restaurantSlice.search_key]);

    useEffect(() => {

        const data = parameter.data.map(item => {
            const existingItem = cartSlice.items.find((i) => i.id === item.id);
            return existingItem == undefined ? { ...item, quantity: 1 } : existingItem;
        })

        setParameter({ ...parameter, data: data })

    }, [cartSlice.items]);


    return (
        <div>


            <RestaurantInforCard onClick={(type: number) => {
                showModal(type)
            }} />

            <div className="w-full bg-white h-[200px] flex items-end"
            >
                <div className="flex justify-center items-center w-full">
                    <Button
                        shape="circle"
                        onClick={() => sliderRef.current?.slickPrev()}
                        icon={<i className="fa-solid fa-chevron-left"></i>}
                        className="flex-none"
                    >
                    </Button>
                    <div className="w-[80%]">
                        <Slider {...settings} ref={sliderRef}>
                            {categories.map((cate) => {
                                return (
                                    <div
                                        key={cate.id}
                                        className={`py-6 px-2 text-center cursor-pointer  ${cate.select ? "border-b-4 border-solid border-orange-500" : ""}`}
                                        onClick={() => handleCategoryClick(cate.id)}
                                    >
                                        <p className={`w-full text-base font-bold ${cate.select ? "text-orange-500" : ""}`}>{cate.name}</p>

                                    </div>
                                );
                            })
                            }
                        </Slider>
                    </div>
                    <Button
                        shape="circle"
                        onClick={() => sliderRef.current?.slickNext()}
                        icon={<i className="fa-solid fa-chevron-right"></i>}
                        className="flex-none"
                    >

                    </Button>
                </div>
            </div>

            <div className="md:px-5 lg:px-10 space-y-10 py-20">

                {
                    categories.length > 0
                        ? <>
                            {categories.map((cate) => {
                                return (
                                    <div
                                        key={cate.id}
                                        ref={(el) => (categoryRefs.current[cate.id] = el)} // Assign ref dynamically
                                        className=""
                                    >
                                        <div className="space-y-2">
                                            <h1 className="text-start font-bold text-3xl">
                                                {cate.name}
                                            </h1>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 justify-items-center">
                                            {
                                                parameter.data.filter((item: ItemEntity) => item.category_id === cate.id).map((item: ItemEntity) => {
                                                    return <OrderCard key={item.id} item={item} />
                                                })
                                            }
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </>
                        : <Empty className="h-[200px]" />
                }


            </div>

            {
                // use  "dialog.open &&" in order for user only to choose brand, but not to choose branch 
                dialog.open &&
                <Modal
                    className="rounded-none"
                    styles={{
                        content: {
                            padding: 0,
                            borderRadius: 10,
                            overflow: "clip"
                        },
                    }}
                    centered
                    footer={false}
                    closeIcon={<CloseCircleOutlined className="text-white" />}
                    open={dialog.open}
                    onCancel={() => {
                        console.log("asd")
                        setDialog({ ...dialog, open: false })
                    }}
                >
                    {dialog.content ?? <></>}
                </Modal>

            }


        </div>

    );
};




var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};