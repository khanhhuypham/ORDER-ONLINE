
import { Button, Drawer, message, Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store";
import { OrderDetail } from "./component/item-detail/item-detail";
import { PaymentMethod } from "./component/payment-method/payment-method";
import { Voucher } from "./component/voucher/voucher";
import { formatAmount } from "../../../../utils/helpers";
import { CustomerInforForm } from "./component/customer-infor/customer-infor";
import { OrderService } from "../../../../services/OrderService";
import { CustomerInfor } from "../../../../models/customer-infor";
import { useDispatch } from "react-redux";
import { setOpenPaymentDrawer } from "../../../../store/drawer/drawerSlice";
import { PAYMENT_METHOD, SERVICE_TYPE } from "../../../../constants/enum";

import { clearCart } from "../../../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE_LINK } from "../../../../routers/module-router";
import { QRCodeView } from "./component/qr-code/qr-code";
import { QRCodeModel } from "../../../../models/qr-code";
import { setSearchKey } from "../../../../store/restaurant/restaurantSlice";





export const PaymentDrawer = () => {
    const [width, setWidth] = useState<number | undefined>(undefined)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [QRcodeModal, setQRcodeModal] = useState<{ open: boolean, data: QRCodeModel }>({ open: false, data: new QRCodeModel() });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSlice = useSelector((state: IRootState) => state.userData)
    const cartSlice = useSelector((state: IRootState) => state.cartData)
    const drawerSlice = useSelector((state: IRootState) => state.drawerData)

    const targetRef = useRef<HTMLDivElement>(null);

    const closeDrawer = () => {
        dispatch(setOpenPaymentDrawer(false))
    };

    const handleOk = () => {

        setIsSubmitting(true); // Disable button when submission starts


        OrderService.createOrder({
            customerInfor: userSlice.user ?? new CustomerInfor(),
            food: cartSlice.items,
            paymentMethod: cartSlice.paymentMethod,
            voucher: cartSlice.voucher
        }).then((res) => {

            setModalConfirmOpen(false);

            if (res.status == 200) {

                finishPaymentProcess()

                if (cartSlice.paymentMethod == PAYMENT_METHOD.COD) {
                    navigate(ROUTE_LINK.PAYMENT_DETAIL + "?id=" + res.data.customer_order_id)
                } else {
                    getQRCode(res.data.customer_order_id)
                }

            } else {
             
                message.error(res.message)
            }
   
        }).catch((error) => {
            console.log(error);
            message.error(error)
        }).finally(() => {
            setIsSubmitting(false); // Re-enable button whether success or failure
        });

    };

    const finishPaymentProcess = () => {
        const voucher = cartSlice.voucher
        const totalAmount = cartSlice.totalAmount
        let shippingFree = 0
        let discountAmount = 0

        if (voucher.id > 0) {
            if (voucher.discount_amount > 0) {
                discountAmount = voucher.discount_amount
            } else if (voucher.discount_percent > 0) {
                discountAmount = totalAmount * voucher.discount_percent * 0.01


                if (discountAmount >= voucher.max_discount_amount) {
                    discountAmount = voucher.max_discount_amount

                }

            }
        }

        if (cartSlice.service_type == SERVICE_TYPE.DELIVERY) {
            shippingFree = cartSlice.shippingFee ?? 0
        }
        dispatch(setSearchKey(""))

        dispatch(clearCart())
        dispatch(setOpenPaymentDrawer(false))
        message.success("Đơn hàng đã được gửi thành công")
    };

    const getQRCode = (paymentId: number) => {

        OrderService.getQRCode(paymentId).then((res) => {
            console.log(res)
            if (res.status == 200) {

                setQRcodeModal({ open: true, data: res.data });
            }

        }).catch((error) => {
            console.log(error);
        });

    };


    const renderDrawerTitle = (
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Thanh toán</span>
            <Button
                aria-label="close-drawer-button"
                shape="circle"
                size="large"
                icon={<CloseOutlined />}
                onClick={closeDrawer}
            />
        </div>
    );



    const RenderFooter = () => {

        return (
            <div className="shadow-lg p-4 space-y-2">

                <div className="flex justify-between text-lg font-semibold">

                    <span>
                        Tổng cộng
                    </span>
                    <span className="text-orange-500">
                        {formatAmount(cartSlice.netAmount.toString())}
                    </span>
                </div>

                <div >

                    <button className="w-full py-2 rounded-3xl text-lg bg-orange-500 text-white border-none"
                        onClick={() => {
                            cartSlice.submitUserInfor && cartSlice.submitUserInfor()
                        }}
                    >
                        Đặt món
                    </button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        setWidth(window.innerWidth <= 640 ? window.innerWidth : undefined)
    }, [drawerSlice.openPaymentDrawer])


    const handleScroll = () => {
        targetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Drawer
                closable={false}
                title={renderDrawerTitle}
                width={width}
                styles={{
                    header: {},
                    body: {
                        padding: "0px",
                    },
                }}
                zIndex={998}
                placement="right"
                onClose={closeDrawer}
                open={drawerSlice.openPaymentDrawer}
            >

                <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 py-4 px-2">
                        <div ref={targetRef}>
                            <CustomerInforForm onError={(hasError: boolean) => {
                                if (hasError) {
                                    handleScroll()
                                } else {
                                    setModalConfirmOpen(true)
                           
                                }
                            }} />
                        </div>

                        <OrderDetail />
                        <PaymentMethod />
                        <Voucher />
                    </div>

                    <div className="flex-none shadow">
                        <hr />
                        <RenderFooter />
                    </div>

                </div>
            </Drawer>

            <Modal title="Thông báo" centered
                open={modalConfirmOpen}
                footer={
                    <div className="space-x-2">
                        <button className="border p-2 rounded"
                            onClick={() => setModalConfirmOpen(false)}
                        >Huỷ</button>
                        <button className="bg-orange-500 text-white p-2 rounded"
                            onClick={handleOk}
                            disabled={isSubmitting} // Disable button during submission
                        > {isSubmitting ? 'Đang xử lý...' : 'Đồng ý'}</button>
                    </div>
                }
            >
                <p>Bạn chắc chắn muốn gửi đơn hàng cho chúng tôi</p>
            </Modal>

            <Modal centered open={QRcodeModal.open}
                onCancel={() => setQRcodeModal({ ...QRcodeModal, open: false })}
                cancelText="Đóng"

                footer={
                    <div className="space-x-2">
                        <button className="border p-2 rounded"
                            onClick={() =>setQRcodeModal({ ...QRcodeModal, open: false })}
                        >Huỷ</button>
               
                    </div>
                }
            >
                <QRCodeView input={QRcodeModal.data} />
            </Modal>
        </>
    );
};






