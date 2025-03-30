import { useEffect, useRef, useState } from 'react';
import IconTickCheckbox from '../icons/icon-tick-checkbox';
import IconCheckbox from '../icons/icon-checkbox';

function Checkbox({
    label,
    checked,
    onChange,
}: {
    label: string | React.ReactNode;
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setIsChecked(event.target.checked);
        onChange && onChange(event);
    };


    useEffect(() => {
        console.log(checked)
        setIsChecked(checked);
    }, [checked]);

    return (
        <div
            className="relative h-full cursor-pointer flex items-center"

        >

            <input
                className="absolute opacity-0 w-full h-full inset-0 cursor-pointer"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className='flex items-center gap-2'>


                {isChecked ? (
                    <IconTickCheckbox className="h-full left-0 bottom-0 pointer-events-none" />
                ) : (
                    <IconCheckbox className="h-full pointer-events-none" />
                )}



                <p className="text-base  select-none">{label}</p>
            </div>

        </div>
    );
}

export default Checkbox;



// const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onChange && onChange(event)
// };

// useEffect(() => {
//     setIsChecked(checked)
// }, [checked])

// return (
//     <div className="relative w-full h-full">
//         {isChecked
//             ? <IconTickCheckbox className="absolute left-0 top-0 h-full" />
//             : <IconCheckbox className="absolute left-0 top-0 h-full" />
//         }

//         <input
//             className="absolute left-0 top-0 w-7 h-6 hidden"
//             type="checkbox"
//             checked={isChecked}
//             onChange={handleCheckboxChange}
//         />
//         <p className="text-base relative left-8 top-0 h-7"> {label}</p>

//     </div>
// );