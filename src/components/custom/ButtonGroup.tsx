import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { PlusOutlined, MinusOutlined, CloseCircleOutlined } from '@ant-design/icons';


export const QuantityBtnGroup = ({quantity,closure}:{quantity:number;closure:((arg0: number)=> void)}) => {


    const handleChangQuantity = (arg0: number) =>{
        console.log(arg0)
        let quantity = arg0
        if (quantity <= 0 ){
            quantity = 0
        }else if (quantity >= 999 ){
            quantity = 999
        }

        // setData(quantity)

        // Math.floor(floatNumber);
        closure(Math.floor(quantity))
    }

    
    return (
     
            <div className='flex rounded-lg'>
                <Button
                    className='rounded-none rounded-l-md h-8'
                    icon={<MinusOutlined />}
                    onClick={(e:React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleChangQuantity(quantity - 1)
                        
                    }}
                />
                <Input
                    value={quantity}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleChangQuantity(Number(e.target.value))
                    }}
                    className="rounded-none w-16 text-center text-[16px] h-8"
                    type='number'
                />
                <Button
                    className='rounded-none rounded-r-md h-8'
                    icon={<PlusOutlined />}
                    onClick={(e:React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleChangQuantity(quantity + 1)
                    }}
                />

            </div>
    
    )

}