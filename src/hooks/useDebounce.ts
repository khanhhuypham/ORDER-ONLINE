import { useEffect } from "react";
import useTimeout from "./useTimeout";

/**
 * @param callback - Callback function to be debounced
 * @param delay - Delay in milliseconds
 * @param dependencies - Dependencies to be passed to the useEffect hook
 *
 * @property { reset: () => void, clear: () => void }
 * reset: Đặt lại thời gian chờ, có nghĩa là bắt đầu đợi chờ giảm phần lần nữa.
 * clear: Xóa thời gian chờ hiện tại, dừng việc thực thi của callback.
 **/

export default function useDebounce(
    callback: () => void,
    delay: number,
    dependencies: any[]
) {
    const { reset, clear } = useTimeout(callback, delay);
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);
}
