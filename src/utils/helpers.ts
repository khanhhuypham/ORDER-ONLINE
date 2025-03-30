import { format, parseISO } from "date-fns";



export function randomIntFromMinToMax(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Hàm định dạng số lớn
export const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(9);
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(6);
    } else if (num >= 1000) {
        return (num / 1000).toFixed(3);
    }
    return num.toString();
};

// Hàm định dạng ngày tháng
export const formatDateTime = (dateTimeString: string): string => {
    try {
        const date = parseISO(dateTimeString);
        return format(date, "dd/MM/yyyy HH:mm");
    } catch (error) {
        console.error("Invalid date format:", error);
        return dateTimeString; // Trả về chuỗi gốc nếu không thể parse
    }
};

export function removeVietnameseFromString(input: string): string {
    try {
        const normalized = input.normalize("NFD");
        const diacriticsPattern = /[\u0300-\u036f]/g;
        return normalized
            .replace(diacriticsPattern, "")
            .replace(/Đ/g, "D")
            .replace(/đ/g, "d");
    } catch (e) {
        console.error(e);
        return "";
    }
}

export function getFirstLetterEachWord(inputString: string): string {
    let result = "";
    const words = inputString.split(" ");

    for (const word of words) {
        if (word.length > 0) {
            result += word[0].toLowerCase();
        }
    }

    return result;
}

export const randomPhoneNumber = () => {
    let phoneNumber = "0";
    for (let i = 0; i < 9; i++) {
        phoneNumber += randomIntFromMinToMax(i === 0 ? 1 : 0, 9).toString();
    }
    return phoneNumber;
};

// Hàm định dạng số điện thoại
export const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    if (!cleaned) return ""; // Trả về chuỗi rỗng nếu không có ký tự nào
    const withLeadingZero = cleaned.startsWith("0") ? cleaned : "0" + cleaned; // Thêm '0' nếu cần
    return withLeadingZero.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3"); // Định dạng nếu đủ ký tự
};

export const getKeys = <TData extends object>(data: TData): (keyof TData)[] => {
    return Object.keys(data) as (keyof TData)[];
};

// Function to generate a random UUID
export function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

export function generateRandomNumber(): number {
    // Generate a random number between 0 and Number.MAX_SAFE_INTEGER
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function getDeviceUUID() {
    let uuid = localStorage.getItem("deviceUUID");
    if (!uuid) {
        uuid = generateUUID();
        localStorage.setItem("deviceUUID", uuid);
    }
    return uuid;
}

export const validatePhoneNumber = (value: string): string => {
    let sanitizedValue = value.replace(/\D/g, "");
    if (sanitizedValue && !sanitizedValue.startsWith("0")) {
        sanitizedValue = "0" + sanitizedValue;
    }
    sanitizedValue = sanitizedValue.slice(0, 11);

    return sanitizedValue;
};

export const validateEmail = (email: string): string => {
    let trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(trimmedEmail)) {
        return trimmedEmail;
    }

    return trimmedEmail;
};

export const handleIsValidInput = (value: string): boolean => {
    const regex = /^(?! )[^\x00-\x1F\x7F]*$/;
    return regex.test(value);
};

export const handleIsValidInputPass = (value: string): boolean => {
    const regex = /^(?! )[A-Za-z0-9 !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/;
    return regex.test(value);
};

export const formatAmount = (amountString: string, delimiter: string = ",") => {
    if (/[^\d.]/.test(amountString)) {
        return "0";
    }
    const numericValue = amountString.replace(/\D/g, "");

    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

export const formatCurrencyDecimal = (number: number | null): string => {
    if (number == null) {
        return "0";
    }
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

export function normalizedString(str: string) {
    if (!str) return str;

    str = str.toLowerCase();
    str = str.trim();

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");

    return str;
}
export const checkUsername = (value: string) => /^[A-Za-z0-9]*$/.test(value);

export function padSingleDigitNumbers(str: string): string {
    return str && str.replace(/(\d+)/g, (match) => match.padStart(2, "0"));
}

// Mã hóa mật khẩu thành Base64
export const encodePassword = (password: string) => {
    return btoa(password);
};

// Giải mã mật khẩu từ Base64
export const decodePassword = (encodedPassword: string) => {
    return atob(encodedPassword);
};

export function isColorLight(color: string) {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
}

export function generateRandomArray(
    length: number,
    min: number,
    max: number
): number[] {
    return Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
    );
}

export function moneyFormat(number: number): string {
    return new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
    }).format(number);
}

export function formatNumber(num: number) {
    num = takeDecimalNumber(num, 2);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function takeDecimalNumber(num: number, n: number) {
    //num : số cần xử lý
    //n: số chữ số sau dấu phẩy cần lấy
    let base = 10 ** n;
    let result = Math.round(num * base) / base;
    return result;
}
