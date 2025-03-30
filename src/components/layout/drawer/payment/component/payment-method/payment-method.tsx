import { PAYMENT_METHOD, SERVICE_TYPE } from "../../../../../../constants/enum";
import { useDispatch } from "react-redux";
import { IRootState } from "../../../../../../store";
import { useSelector } from "react-redux";
import { setPaymentMethod, setShipFee } from "../../../../../../store/cart/cartSlice";
import { Card, message } from "antd";
import { LocationModel } from "../../../../../../models/location";
import { OrderService } from "../../../../../../services/OrderService";
import { setDelivery } from "../../../../../../store/restaurant/restaurantSlice";
import { Delivery } from "../../../../../../models/delivery";

interface RadioOption {
    value: number;
    label: string;
}

export const PaymentMethod = () => {

    const dispatch = useDispatch()
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);
    const cartSlice = useSelector((state: IRootState) => state.cartData)
    


    const options: RadioOption[] = [
        { value: PAYMENT_METHOD.PREPAYMENT, label: 'Thanh toán qua QR code' },
        { value: PAYMENT_METHOD.COD, label: 'Thanh toán khi nhận hàng(COD)' },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const paymentMethod:PAYMENT_METHOD = parseInt(event.target.value)

        if (cartSlice.service_type == SERVICE_TYPE.DELIVERY){

            if (cartSlice.location.properties.label.length > 0){
                getShippingFee(cartSlice.location,paymentMethod)
            }else{
                message.warning("Vui lòng nhập địa chỉ giao hàng")
            }

           
        }
        dispatch(setPaymentMethod(paymentMethod))
    };

    const getShippingFee = (location: LocationModel,payment_method:PAYMENT_METHOD) => {

        OrderService.getEstimateFee({
            branch_id: restaurantSlice.branch.id,
            address: location.properties.label,
            payment_method:payment_method,
            cod:payment_method == PAYMENT_METHOD.COD ? cartSlice.totalAmount : 0,
            lat: location.geometry.coordinates[1],
            lng: location.geometry.coordinates[0]
        }).then((res) => {
           
            if (res.status == 200) {

                if (res.data.length > 0) {
                    dispatch(setDelivery(res.data[0]))
                    dispatch(setShipFee(res.data[0].shipping_fee))
                } else {
                    dispatch(setDelivery(new Delivery()))
                    dispatch(setShipFee(restaurantSlice.brand.setting?.shipping_fee_amount ?? 0))
                }

            } else {
                message.error(res.message)
                dispatch(setDelivery(new Delivery()))
                dispatch(setShipFee(restaurantSlice.brand.setting?.shipping_fee_amount ?? 0))
            }



        }).catch((error) => {
            console.log(error);
            message.error(error)
        });

    };
    


    return (

        <Card title="Phương thức thanh toán" className="shadow"
            bodyStyle={{
                padding:0
            }}
        >
      
            <div className="py-4 px-6">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="radio-group"
                            value={option.value}
                            checked={cartSlice.paymentMethod === option.value}
                            onChange={handleChange}
                            className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                        <span className="text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </Card>

    );
}