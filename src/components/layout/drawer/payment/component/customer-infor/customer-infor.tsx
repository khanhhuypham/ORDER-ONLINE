import { AsyncPaginate } from "react-select-async-paginate";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ActionMeta, SingleValue } from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { Card, DatePicker, message, Segmented } from "antd";
import { IRootState } from "../../../../../../store";
import { CustomerInfor } from "../../../../../../models/customer-infor";
import { phoneRegExp } from "../../../../../../constants/regex";
import { LocationModel } from "../../../../../../models/location";
import { setUser } from "../../../../../../store/user/userSlice";
import { OrderService } from "../../../../../../services/OrderService";
import DateCustomInput from "../../../../../custom/date-input-custom";
import { DELIVERY_TYPE, PAYMENT_METHOD, SERVICE_TYPE } from "../../../../../../constants/enum";
import { setLocation, setServiceType, setShipFee, setSubmitUserInfor } from "../../../../../../store/cart/cartSlice";
import { setDelivery } from "../../../../../../store/restaurant/restaurantSlice";
import { Delivery } from "../../../../../../models/delivery";
import dayjs from 'dayjs';
import { getCurrentDateTime } from "../../../../../../utils/time-utils";


export interface LocationListProps {
    data?: Location[];
    search_key?: string;
}



export const CustomerInforForm = ({ onError }: { onError?: ((hasError: boolean) => void) }) => {
    const dispatch = useDispatch();
    const drawerSlice = useSelector((state: IRootState) => state.drawerData);
    const restaurantSlice = useSelector((state: IRootState) => state.restaurantData);
    const cartSlice = useSelector((state: IRootState) => state.cartData)
    // Initialize Formik using useFormik hook.
    const formik = useFormik({

        initialValues: new CustomerInfor(),

        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Họ tên không được để trống"),

            phone: Yup.string()
                .matches(phoneRegExp, "Số điện thoại không hợp lệ")
                .required("Số điện thoại không được để trống"),

            location: Yup.mixed().when("service_type", {
                is: SERVICE_TYPE.DELIVERY,
                then: Yup.object().shape({
                    properties: Yup.object().shape({
                        // Ensure both id and label are present and not empty
                        id: Yup.string()
                            .trim()
                            .required('Địa chỉ không hợp lệ')
                            .min(1, 'Địa chỉ không hợp lệ'),
                        label: Yup.string()
                            .trim()
                            .required('Vui lòng chọn địa chỉ cụ thể')
                            .min(3, 'Địa chỉ quá ngắn'),
                    })
                }).required('Địa chỉ không được để trống'),
                otherwise: Yup.mixed().nullable(),
            }),

            receive_date: Yup.string().when(["service_type", "delivery_type"], {
                is: (serviceType: SERVICE_TYPE, delivery_type: number) =>
                    serviceType === SERVICE_TYPE.DELIVERY && delivery_type !== DELIVERY_TYPE.IMMEDIATE,
                then: Yup.string().required("Ngày nhận hàng không được để trống"),
                otherwise: Yup.string().nullable(),
            }),

            note: Yup.string().max(255, "Ghi chú không được vượt quá 255 ký tự"),
        }),

        onSubmit: (values) => {

            if (cartSlice.items.length == 0){
                message.error("Vui lòng chọn món trước khi đặt món")
                return
            }
           
            if (formik.isValid) {
      
                onError && onError(false)


                
              
                if (formik.values.service_type === SERVICE_TYPE.DINNING || formik.values.service_type === SERVICE_TYPE.TAKEAWAY) {
                    let location = values.location
                    location.properties.label = restaurantSlice.branch.address_full_text
                    dispatch(setUser({ ...values, location: location }));
                } else {
                    dispatch(setUser(values));
                }
            }

        },
    });

    // Function to load options for AsyncPaginate
    const loadOptions = (searchQuery: string, loadedOptions: LocationModel[], { page }: { page: number }) => {
        return OrderService.getLocations(searchQuery)
            .then((res) => {
                const options = res.features.map((item: any) => {
                    const location = item as LocationModel;
                    return location;
                });

                return {
                    options: options,
                    hasMore: true,
                    additional: { page: page + 1 },
                };
            })
            .catch((error) => {
                console.error("Error fetching options:", error);
                return { options: [], hasMore: false, additional: { page } };
            });
    };


    const getShippingFee = (location: LocationModel) => {

        OrderService.getEstimateFee({
            branch_id: restaurantSlice.branch.id,
            address: location.properties.label,
            payment_method:cartSlice.paymentMethod,
            cod:cartSlice.paymentMethod == PAYMENT_METHOD.COD ? cartSlice.totalAmount : 0,
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

    useEffect(() => {
        

        if(formik.values.name.length == 0){
            formik.resetForm()
            formik.setFieldValue("location", new LocationModel());
        }
     
        dispatch(setSubmitUserInfor(() => {
            formik.submitForm()
        }))


    }, [drawerSlice.openPaymentDrawer]);

    useEffect(() => {
      
        if (!formik.isValid) {
            onError && onError(true)
        }

    }, [formik.isSubmitting])

    const disabledTime = (current: dayjs.Dayjs) => {
        return current.isBefore(dayjs().add(1, 'hour'));
    };


    return (
        <Card className="bg-white shadow" title="Thông tin người mua">


            <form className="space-y-4 px-2" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                    <Segmented
                        className="bg-orange-50 h-9 leading-none"
                        block
                        options={[
                            { label: "Tại chỗ", value: SERVICE_TYPE.DINNING },
                            { label: "Đến lấy", value: SERVICE_TYPE.TAKEAWAY },
                            { label: "Giao hàng", value: SERVICE_TYPE.DELIVERY },
                        ]}
                        value={formik.values.service_type}
                        onChange={(arg0: string | number) => {
                            formik.setFieldValue("service_type", parseInt(String(arg0)))
                            dispatch(setServiceType(parseInt(String(arg0))))
                         
                        }}
                    />
                </div>
                <div className="space-y-2">
                    {/* Họ tên */}
                    <div className="w-full">
                        {renderField({
                            required: true,
                            label: "Họ tên người nhận",
                            name: "name",
                            field: (
                                <input
                                    // autoComplete="off"
                                    name="name"
                                    type="text"
                                    placeholder="Nhập họ tên người nhận"
                                    className="form-input placeholder:font-light"
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue("name", e.target.value)
                                    }}
                                />
                            ),
                            error:
                                formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : "",
                        })}
                    </div>


                    <div className="w-full">
                        {renderField({
                            required: true,
                            label: "Số điện thoại",
                            name: "phone",
                            field: (
                                <input
                                    // autoComplete="off"
                                    name="phone"
                                    type="tel"
                                    className="form-input placeholder:font-light"
                                    placeholder="Nhập số điện thoại người nhận"
                                    value={formik.values.phone}
                                    onChange={(e) => {
                                        formik.setFieldValue("phone", e.target.value.slice(0, 11))
                                    }}
                                />
                            ),
                            error: formik.errors.phone
                        })}
                    </div>

                    {formik.values.service_type === SERVICE_TYPE.DELIVERY && (
                        <div className="w-full">
                            {renderField({
                                label: "Địa chỉ giao hàng",
                                name: "location",
                                field: (
                                    <AsyncPaginate
                                        className="text-[16px]"
                                        getOptionValue={(option) => option.properties.id}
                                        getOptionLabel={(option) => option?.properties.label}
                                        onChange={(
                                            value: SingleValue<LocationModel>,
                                            actionMeta: ActionMeta<LocationModel>
                                        ) => {
                                            formik.setFieldValue("location", value);
                                            getShippingFee(value as LocationModel)
                                            dispatch(setLocation(value as LocationModel))
                                        }}
                                        value={formik.values.location}
                                        loadOptions={loadOptions as any}
                                        closeMenuOnSelect={true}
                                        isMulti={false}
                                        debounceTimeout={300}
                                        isSearchable={true}
                                        placeholder="Chọn địa chỉ"
                                        additional={{
                                            page: 1,
                                        }}
                                    />
                                ),
                                error: formik.errors.location?.properties?.label
                            })}
                        </div>
                    )}


                    {formik.values.service_type === SERVICE_TYPE.DELIVERY && (
                        <div>
                            <div className="w-full space-y-2">
                                <label className="font-medium text-xs">
                                    Thời gian nhận hàng
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-1">
                                        <input
                                            type="radio"
                                            name="delivery_type"
                                            value={DELIVERY_TYPE.IMMEDIATE}
                                            checked={formik.values.delivery_type === DELIVERY_TYPE.IMMEDIATE}
                                            className="mr-[2px] appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                            onChange={(e) => {
                                                formik.setFieldValue("delivery_type", parseInt(e.target.value));
                                            }}
                                        />
                                        <span className="font-light text-xs">Giao ngay</span>
                                    </label>
                                    <label className="flex items-center space-x-1">
                                        <input
                                            type="radio"
                                            name="delivery_type"
                                            value={DELIVERY_TYPE.SCHEDULED_FIRST}
                                            checked={formik.values.delivery_type === DELIVERY_TYPE.SCHEDULED_FIRST}
                                            className="mr-[2px] appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                            onChange={(e) => {
                                                formik.setFieldValue("delivery_type", parseInt(e.target.value));
                                            }}
                                        />
                                        <span className="font-light text-xs">Đặt trước</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}


                    {formik.values.service_type === SERVICE_TYPE.DELIVERY && formik.values.delivery_type == DELIVERY_TYPE.IMMEDIATE
                        ? <></>
                        : (
                            <div className="w-full">
                                {renderField({
                                    required: formik.values.service_type === SERVICE_TYPE.DELIVERY && formik.values.delivery_type == DELIVERY_TYPE.SCHEDULED_FIRST,
                                    label: "Ngày nhận hàng",
                                    name: "receive_date",
                                    field: (

                                        // <DatePicker
                                        //     showTime={{ format: 'HH:mm' }}
                                        //     className="form-input disabled:bg-[#F2F2F2] w-full font-light "
                                        //     placeholder="Ngày nhận hàng"
                                        //     format="DD/MM/YYYY HH:mm"
                                        //     onChange={(date:dayjs.Dayjs,dateString:string | string[])=>{
                                                
                                        //         const formattedDate = dayjs(String(dateString)).format('DD/MM/YYYY HH:mm');
                                        //         formik.setFieldValue("receive_date", formattedDate);

                                        //     }}
                                        //     inputReadOnly={true}
                               
                                        //     defaultValue={dayjs(getCurrentDateTime(), "DD/MM/YYYY HH:mm")}
                                        //     minDate={dayjs(getTodayDate(), "DD/MM/YYYY")}
                                        //     disabledTime={(date) => {
                                        //         const currentHour = dayjs().hour();
                                        //         const currentMinute = dayjs().minute();

            
                                        //         if (date.isSame(dayjs(), 'day')) {
                                        //             return {
                                        //                 disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
                                        //                 disabledMinutes: (hour) => {
                                        //                     if (hour === currentHour) {
                                        //                         return Array.from({ length: currentMinute + 1 }, (_, i) => i);
                                        //                     }
                                        //                     return [];
                                        //                 },
                                        //             };
                                        //         }
                                        //         return {};
                                        //     }}
                                        // />
                                      

                                        <DateCustomInput
                                            type="datetime-local"
                                            placeholder="Ngày nhận hàng"
                                            value={formik.values.receive_date}
                                            onChange={(dateString: string) => {
                                                formik.setFieldValue("receive_date", dateString);
                                            }}
                                            minDate={getCurrentDateTime()}
                                            
                                        />
                                    ),
                                    error: formik.errors.receive_date
                                })}
                            </div>
                        )

                    }


                    <div className="w-full">
                        {renderField({
                            label: "Ghi chú",
                            name: "note",
                            field: (
                                <textarea
                                    id="note"
                                    name="note"
                                    value={formik.values.note}
                                    className="text-gray-500 form-textarea placeholder:font-light"
                                    // className="text-gray-500 focus:outline-none"
                                    placeholder="Nhập nội dung"
                                    maxLength={255}
                                    rows={3}
                                    onChange={(e) => {
                                        formik.setFieldValue("note", e.target.value.slice(0, 256));
                                    }}
                                />
                            ),
                            error:
                                formik.touched.note && formik.errors.note ? formik.errors.note : "",
                        })}
                    </div>



                    {/* <Button danger onClick={formik.submitForm}>Submit</Button> */}
                </div>

            </form>
        </Card>
    );
};

// A helper to render fields
function renderField({
    label,
    name,
    field,
    required,
    error,
}: {
    label: string;
    name: string;
    field: React.ReactElement<any, any>;
    required?: boolean;
    error?: string;
}) {
    return (
        <>
            <label htmlFor={name} className="font-medium text-xs">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            {field}
            {error ? <div className="text-xs text-red-500">{error}</div> : null}
        </>
    );
}
