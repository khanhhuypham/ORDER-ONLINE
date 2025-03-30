import React, { useEffect, useState } from "react";

interface DateInputProps {
    placeholder?: string;
    value?: string;
    minDate?: string; // Minimum selectable date
    maxDate?: string; // Maximum selectable date
    onChange?: (dateString: string) => void;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    type?: "date" | "datetime-local" | "time";
}

const convertToInputDate = (dateString: string, type: string): string => {
    switch (type) {
        case "datetime-local": {
            // Assuming dateString is in the format "YYYY-MM-DDTHH:mm"
            const [datePart, timePart] = dateString.split(" ");
            const [day, month, year] = datePart.split("/");
            const [hour, minute] = timePart.split(":");
            return `${year}-${month}-${day}T${hour}:${minute}`;
        }
        case "time": {
            // Assuming dateString is in the format "HH:mm"
            const [hour, minute] = dateString.split(":");
            return `${hour}:${minute}`;
        }
        default: {
            // Assuming dateString is in the format "YYYY-MM-DD"
            const [day, month, year] = dateString.split("/");
            return `${year}-${month}-${day}`;
        }
    }
};

// Helper function to convert a date from yyyy-MM-dd to dd/MM/yyyy
const convertToDisplayDate = (dateString: string, type: string): string => {
    console.log(dateString)

    switch (type) {
        case "datetime-local": {
            // Assuming dateString is in the format "dd/MM/yyyy HH:mm"
            const [datePart, timePart] = dateString.split("T");
            const [year, month, day] = datePart.split("-");
            const [hour, minute] = timePart.split(":");
            return `${day}/${month}/${year} ${hour}:${minute}`;
        }
        case "time": {
            // Assuming dateString is in the format "HH:mm"
            const [hour, minute] = dateString.split(":");
            return `${hour}:${minute}`;
        }
        default: {
            // Assuming dateString is in the format "dd/MM/yyyy"
            const [year, month, day] = dateString.split("-");
            return `${day}/${month}/${year}`;
        }
    }
};

const DateCustomInput: React.FC<DateInputProps> = ({
    placeholder = "Chọn thời gian",
    value,
    minDate,
    maxDate,
    onChange,
    required = false,
    className = "min-w-[180px]",
    disabled = false,
    type = "date"
}) => {

    const [internalValue, setInternalValue] = useState<string>(
        value ? convertToInputDate(value, type) : ""
    );

    useEffect(() => {
        if (value) {
            setInternalValue(convertToInputDate(value, type));
        }
    }, [value, type]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = e.target.value;
        setInternalValue(inputDate);

        // Convert input value back to dd/MM/yyyy format before passing to onChange
        if (onChange) {
            onChange(inputDate === '' ? '' : convertToDisplayDate(inputDate, type));
        }
    };

    return (
        <div className={className}>
            <input
                disabled={disabled}
                onClick={(e) => e.currentTarget.showPicker()}
                type={type}
                className="form-input disabled:bg-[#F2F2F2] w-full font-light"
                placeholder={placeholder}
                value={internalValue}
                min={minDate ? convertToInputDate(minDate, type) : undefined}
                max={maxDate ? convertToInputDate(maxDate, type) : undefined}
                onChange={handleDateChange}
                required={required}
    
            />
        </div>
    );
};

export default DateCustomInput;
