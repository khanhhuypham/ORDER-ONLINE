import { useEffect, useState } from "react";

import QRCode from "react-qr-code";
import { QRCodeModel } from "../../../../../../models/qr-code";
import ClipboardCopyBtn from "../../../../../custom/clipboard-copy-btn";
import { formatNumber } from "../../../../../../utils/helpers";
import { PAYMENT_TYPE } from "../../../../../../constants/enum";

export const QRCodeView = ({input}:{input:QRCodeModel}) => {

    const [data, setData] = useState<QRCodeModel>(new QRCodeModel());
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        function handleResize() {
            let remainingHeight = window.innerHeight
            const content = document.getElementById("content") as HTMLElement;
  
         
            if (content) {
                let contentHeight = content.offsetHeight + 16 + 20;

  
                if (contentHeight > window.innerHeight){
                    remainingHeight = contentHeight
                }else{
                    remainingHeight =  window.innerHeight - 200
            
                }
                
            }

    
            setHeight(remainingHeight)
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])

    useEffect(() => {
        setData(input);
    }, [input]);

    return (
        <div className="mt-5 pb-4 overflow-y-auto space-y-2 tracking-[0.25px]"
            style={{
                height:height
            }}
        
        >
            <div className="bg-[#FCFBFA] space-y-8" id="content">
                <p>
                    Mở App Ngân hàng bất kỳ hoặc Momo để{" "}
                    <b>Để quét mã QRCode</b> hoặc <b>chuyển khoản</b> chính
                    xác nội dung bên dưới
                </p>
                <div className="flex justify-center">

                    {
                        data.payment_type == PAYMENT_TYPE.VIETQR 
                        ?  <img src={data.payment_url} width={200} height={200} className="border-solid border-8 border-[rgba(106,106,106,0.48)] box-border rounded-lg"/>
                        : (
                            <QRCode
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    borderStyle: "solid",
                                    borderWidth: "8px",
                                    borderColor: "rgba(106, 106, 106, 0.48)",
                                    boxSizing: "border-box",
                                    borderRadius: "8px",
                                }}
                                value={data?.qr_code ?? ""}
                            />
                        )
                    }
                                     
                </div>

                <div className="space-y-3">
                    <div>
                        <p className="text-gray-600">Ngân hàng</p>
                        <p className="font-bold">{data?.bank_name}</p>
                    </div>

                    <div>
                        <p className="text-gray-600">Chủ tài khoản</p>
                        <p className="font-bold">
                            {data?.bank_account_name}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-600">Số tài khoản</p>
                            <p className="font-bold">{data?.bank_number}</p>
                        </div>
                        <ClipboardCopyBtn copyText={data?.bank_number} />
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-600">Số tiền</p>
                            <p className="font-bold">
                                {formatNumber(data.total_amount)}
                            </p>
                        </div>
                        <ClipboardCopyBtn copyText={formatNumber(data.total_amount)} />
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-600">Nội dung</p>
                            <p className="font-bold">
                                Thanh toán cho đơn hàng
                            </p>
                        </div>
                        <ClipboardCopyBtn copyText={"Pham khan hhuy"} />
                    </div>
                </div>
                <p>
                    Lưu ý: nhập chính xác số tiền{" "}
                    <b>{formatNumber(data.total_amount)}</b> khi chuyển khoản
                </p>
            </div>
        </div>
    );


}
