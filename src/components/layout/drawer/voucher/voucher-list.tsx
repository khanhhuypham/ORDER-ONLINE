import { Button, Drawer, List, message } from "antd";
import { useState, useEffect } from "react";
import {CloseOutlined} from "@ant-design/icons";
import { OrderService } from "../../../../services/OrderService";
import { formatAmount } from "../../../../utils/helpers";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store";
import { useDispatch } from "react-redux";
import { setVoucher } from "../../../../store/cart/cartSlice";
import { Voucher } from "../../../../models/voucher";
import { setOpenPaymentDrawer, setOpenVoucherDrawer } from "../../../../store/drawer/drawerSlice";

export const VoucherDrawer = () => {
    const [width, setWidth] = useState<number | undefined>(undefined)
    const dispatch = useDispatch();
    const drawerSlice = useSelector((state: IRootState) => state.drawerData)
    const cartSlice = useSelector((state: IRootState) => state.cartData)

    const [vouchers, setVouchers] = useState<Voucher[]>([])
    const [total, setTotal] = useState<number>(1)


    const getItems = () => {

        OrderService.getVoucher().then((res) => {
            if (res.status == 200) {
                setVouchers(res.data.list.map((voucher) =>
                    voucher.id === cartSlice.voucher.id
                        ? { ...voucher, selected: true }
                        : { ...voucher, selected: false }
                ))
            } else {
                message.error(res.message)
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleSelect = (id: number) => {

        const updatedVouchers = vouchers.map((voucher) =>
            voucher.id === id
                ? { ...voucher, selected: !voucher.selected }
                : { ...voucher, selected: false }
        );

        const selectVoucher = updatedVouchers.filter((voucher) => voucher.selected)
        if (selectVoucher.length > 0) {
            dispatch(setVoucher(selectVoucher[0]))
        } else {
            dispatch(setVoucher(new Voucher()))
        }

        setVouchers(updatedVouchers)

    };

    useEffect(() => {
        setWidth(window.innerWidth <= 640 ? window.innerWidth : undefined)
        setTotal(cartSlice.items.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0))
        getItems()


    }, [drawerSlice.openVoucherDrawer])


    const closeDrawer = () => {
        dispatch(setOpenVoucherDrawer(false))
        dispatch(setOpenPaymentDrawer(true))
    };


    const renderDrawerTitle = (
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Voucher</span>
            <Button
                aria-label="close-drawer-button"
                shape="circle"
                size="large"
                icon={<CloseOutlined />}
                onClick={closeDrawer}
            />
        </div>
    );

    const VoucherCard = ({ voucher }: { voucher: Voucher }) => {
        return (
            <div
                className={`bg-[#FED7AA] flex w-full drop-shadow-md rounded-lg`}
                onClick={() => {
                    let discountAmount = 0

                    if (voucher.discount_amount > 0) {
                        discountAmount += voucher.discount_amount;
                    } else if (voucher.discount_percent > 0) {
                        discountAmount += total * (voucher.discount_percent / 100);
                    }


                    if (total <  voucher.min_order_amount){
                        message.warning(`Điều kiện đơn hàng tối thiểu ${formatAmount(voucher.min_order_amount.toString())}`)
                    }else{
                        handleSelect(voucher.id)
                    }

                }}
            >
                <div
                    className="bg-[#F97316] p-4 text-white font-bold rounded-l-lg"
                    style={{ minHeight: "100%",width:150 }}
                >
                    <p className="text-lg">Giảm</p>
                    <p className="text-2xl font-extrabold">
                        {voucher?.discount_percent > 0
                            ? `${voucher?.discount_percent}%`
                            : formatAmount((voucher?.discount_amount.toString() ?? 0).toString())}
                    </p>
                    <p className="text-md font-normal">Mã sản phẩm</p>
                </div>

                <div className=" flex-1 bg-[#FED7AA] p-4 flex items-center border-r-2 border-dashed border-white">
                    <div className="space-y-1">
                        {/* <p className="text-[#F97316] font-bold">
                            VOUCHER GIẢM{" "}
                            {voucher?.discount_percent > 0
                                ? formatAmount((total * voucher?.discount_percent * 0.01).toString())
                                : formatAmount((voucher?.discount_amount ?? 0).toString())}
                        </p> */}

                        <p className="text-[#F97316] font-bold">{voucher.name}</p>

                        <div>
                            <p className="font-bold">{voucher?.code ?? ""}</p>
                            <p className="text-gray-600">
                                Điều kiện đơn tối thiểu{" "}
                                {formatAmount((voucher?.min_order_amount ?? 0).toString())}
                            </p>
                            <p className="text-gray-600">
                                HSD:{voucher?.end_date ?? ""}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[50px] flex justify-center items-center">

                    {voucher.selected ? (
                        <i className="fa-solid fa-check text-green-600"></i>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    };

    return (

        <Drawer
            closable={false}
            title={renderDrawerTitle}
            styles={{
                header: {},
                body: {
                    padding: "0px",
                },
            }}
            width={width}
            placement="right"
            onClose={closeDrawer}
            open={drawerSlice.openVoucherDrawer}
        >

            <div className="h-full flex flex-col">

                <div className="flex-1 overflow-y-auto space-y-4 py-4 px-2">
                    <List
                        dataSource={vouchers}
                        size="large"
                        renderItem={(voucher, index) => (
                            <List.Item>
                                <div className="w-full">
                                    <VoucherCard voucher={voucher} />
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <hr />
                <div className="flex-none shadow p-8">

                    <button type="submit" className="w-full py-2 rounded-3xl text-lg bg-orange-500 text-white border-none"
                        onClick={() =>closeDrawer()}
                    
                    >Sử dụng </button>
                </div>


            </div>
        </Drawer>

    );
}