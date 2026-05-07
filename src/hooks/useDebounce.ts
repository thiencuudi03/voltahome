//Hook dùng cho thanh tìm kiém
"use client";

import { useState, useEffect } from "react";

/**
 * Hook giúp trì hoãn việc cập nhật giá trị (Debounce)
 * @param value Giá trị cần debounce (thường là từ input tìm kiếm)
 * @param delay Thời gian chờ (miliseconds)
 * @returns Giá trị đã được debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Thiết lập một timer để cập nhật giá trị sau khoảng thời gian delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Xóa timer nếu giá trị thay đổi trước khi hết thời gian delay
    // Đây là phần quan trọng nhất để ngăn chặn việc gọi xử lý liên tục
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
