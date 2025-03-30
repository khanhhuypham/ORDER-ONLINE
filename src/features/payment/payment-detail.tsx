import { Button, message, Modal } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { ItemCard } from "./item-card";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE_LINK } from "../../routers/module-router";
import { formatAmount } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { OrderService } from "../../services/OrderService";
import { OrderDetail } from "../../models/order/order-detail";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../constants/enum";
import { QRCodeModel } from "../../models/qr-code";
import { QRCodeView } from "../../components/layout/drawer/payment/component/qr-code/qr-code";
import { Image } from "../../components/custom/image";
import { Status } from "../order-history/component/order-status";
import { PopupInterface } from "../../constants/popup-interface";


export const PaymentDetail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);
    const [data, setData] = useState<OrderDetail>(new OrderDetail());
    const [QRcodeModal, setQRcodeModal] = useState<{ open: boolean, data: QRCodeModel }>({ open: false, data: new QRCodeModel() });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "" });

    const getOrderDetail = (id: number) => {
        OrderService.getOrderDetail(id).then((res) => {

            if (res.status == 200) {
                setData(res.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const getQRCode = (paymentId: number) => {
        OrderService.getQRCode(paymentId).then((res) => {

            if (res.status == 200) {
                presentDialogQRCode(res.data)
            }

        }).catch((error) => {
            console.log(error);
        });
    };

    const cancelOrder = (paymentId: number) => {
        setIsSubmitting(true); // Disable button when submission starts

        OrderService.cancelOrder(paymentId).then((res) => {
            setModalConfirmOpen(false);
            if (res.status == 200) {
                getOrderDetail(paymentId)
                message.success("Huỷ đơn hàng thành công");
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsSubmitting(false); // Re-enable button whether success or failure
            setDialog({ ...dialog, open: false })
        });
    };

    const presentDialogQRCode = (data: QRCodeModel) => {
        let component = <QRCodeView input={data} />
        setDialog({ open: true, content: component, title: "" })
    };


    const presentDialogConfirm = () => {
        let component = <p>Bạn chắc chắn muốn huỷ đơn hàng này</p>
        setDialog({ open: true, content: component, title: "Thông báo" })
    };

    useEffect(() => {
        const id = searchParams.get("id");
        getOrderDetail(Number(id));
    }, []);

    return (
        <>
            <div className="h-screen flex flex-col bg-gray-50">
                {/* Header */}
                <div className="sticky top-0 h-14 bg-white shadow-md z-10">
                    <Button
                        type="text"
                        className="h-full"
                        icon={<i className="fa-solid fa-chevron-left"></i>}
                        onClick={() => navigate(ROUTE_LINK.ORDE_HISTORY)}
                    >
                        <span className="text-base">Chi tiết đơn hàng</span>
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-6">
                        {/* Restaurant Info */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24">
                                    <Image imageUrl={restaurantSlice.restaurant.logo} className="h-24 w-24 rounded-lg" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg font-medium">{restaurantSlice.restaurant.name}</p>
                                    <Status status={data.customer_order_status} />
                                </div>

                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex gap-3">
                                <div className="w-5 text-center">
                                    <i className="fa-solid fa-location-dot text-orange-500"></i>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold mb-4">Thông tin nhận hàng</p>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-semibold">Mã đơn hàng: </span>
                                            <span className="text-gray-600">
                                                #{data.customer_order_status == ORDER_STATUS.CONFIRM && data.restaurant_third_party_delivery_id > 0
                                                    ? data.third_party_delivery_order_id
                                                    : data.id}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Tên người nhận: </span>
                                            <span className="text-gray-600">{data.customer_name}</span>
                                        </div>
                                        <div className="">
                                            <span className="font-semibold">Số điện thoại: </span>
                                            <span className="text-gray-600">{data.phone}</span>
                                        </div>

                                        <div className="flex items-center">

                                            <div>
                                                <span className="font-semibold">Địa chỉ: </span>
                                                {
                                                    data.customer_order_status == ORDER_STATUS.CONFIRM && data.restaurant_third_party_delivery_id > 0
                                                        ? <a
                                                            className="text-blue-600 underline"
                                                            href={data.tracking_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer" // Important addition for security and performance
                                                        >{data.address}</a>
                                                        : <span className="text-gray-600">{data.address}</span>
                                                }

                                            </div>


                                        </div>


                                        <div>
                                            <span className="font-semibold">Phương thức thanh toán: </span>
                                            <span className="text-red-600">{data.payment_method == PAYMENT_METHOD.COD ? "Thanh toán khi nhận hàng(COD)" : "Thanh toán qua QR code"}</span>
                                        </div>

                                        <div className="">
                                            <span className="font-semibold">Ghi chú: </span>
                                            <span className="text-gray-600">{data.note}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="font-bold mb-4">Chi tiết đơn hàng</p>
                            <div className="max-h-[40vh] overflow-y-auto">
                                <div className="space-y-3">
                                    {data.customer_order_details.map((item, index) => (
                                        <div key={index}>
                                            <ItemCard item={item} />
                                            {index < data.customer_order_details.length - 1 && (
                                                <hr className="my-3" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="mt-4 space-y-2 pt-4 border-t">
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-semibold">Tổng tạm tính</span>
                                    <span>{formatAmount((data.amount ?? 0).toString())}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-semibold">Ưu đãi</span>
                                    <span>{formatAmount(data.voucher_amount.toString())}</span>
                                </div>

                                {data.shipping_fee > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                        <span className="font-semibold">Phí vận chuyển</span>
                                        <span>{formatAmount(data.shipping_fee.toString())}</span>
                                    </div>
                                )}


                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-4">

                                    {data.payment_method == PAYMENT_METHOD.PREPAYMENT &&
                                        <Button
                                            type="primary"
                                            className="bg-blue-500 hover:bg-blue-600"
                                            onClick={() => getQRCode(data.id)}
                                        >
                                            QR CODE thanh toán
                                        </Button>
                                    }
                                    {data.customer_order_status == ORDER_STATUS.PENDING &&
                                        <Button
                                            color="red"
                                            variant="solid"
                                            onClick={() => presentDialogConfirm()}
                                        >
                                            Huỷ đơn hàng
                                        </Button>
                                    }

                                </div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Tổng thanh toán</span>
                                <span className="text-red-600">
                                    {formatAmount(data.total_amount.toString())}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                className="rounded-none"
                centered
                title={dialog.title}
                closeIcon={<CloseCircleOutlined className="text-white" />}
                open={dialog.open}
                onCancel={() => {
                    setDialog({ ...dialog, open: false })
                }}

                footer={
                    <div className="space-x-2">
                        <button className="border p-2 rounded"
                            onClick={() =>  setDialog({ ...dialog, open: false })}
                        >
                            Huỷ
                        </button>

                        {
                            dialog.title == "Thông báo" &&
                            <button 
                                className="bg-orange-500 text-white p-2 rounded"
                                onClick={() => cancelOrder(data.id)}
                                disabled={isSubmitting} // Disable button during submission
                            > 
                                {isSubmitting ? 'Đang xử lý...' : 'Đồng ý'}
                            </button>
                        }
                      
                    </div>
                }
            >
                {dialog.content ?? <></>}
            </Modal>

          
        </>
    );
};


