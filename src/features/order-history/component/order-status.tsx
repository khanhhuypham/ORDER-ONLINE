import { Tag } from "antd"
import { ORDER_STATUS } from "../../../constants/enum"

export const Status = ({status}:{status:ORDER_STATUS}) => {
    switch (status) {

        case ORDER_STATUS.PENDING:

            return (
                <Tag className="text-orange-700 bg-orange-100">
                    <span className="font-medium">Đang xử lý</span>
                </Tag>
            )


        case ORDER_STATUS.COMPLETE:

            return (
                <Tag className="text-green-700 bg-green-100">
                    <span className="font-medium">Hoàn tất</span>
                </Tag>
            )



        case ORDER_STATUS.CONFIRM:
            return (
                <Tag className="text-green-700 bg-green-100">
                    <span className="font-medium">Đã xác nhận</span>
                </Tag>
            )
            
    
        case ORDER_STATUS.RESTAURANT_CANCEL, ORDER_STATUS.CUSTOMER_CANCEL:
            return (
                <Tag className="text-red-700 bg-red-100">
                    <span className="font-medium">Đã huỷ</span>
                </Tag>
            )




        case ORDER_STATUS.DELIVERING:
            return (
                <Tag className="text-blue-700 bg-blue-100">
                    <span className="font-medium">Đang giao</span>
                </Tag>
            )



        default:
            return (
                <Tag className="text-orange-700 bg-orange-100">
                    <span className="font-medium">Đang xử lý</span>
                </Tag>
            )


    }
}