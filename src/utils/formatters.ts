/**
 * Định dạng số thành tiền tệ Việt Nam (VND)
 * Ví dụ: 10000000 -> 10.000.000₫
 */
export const formatCurrency = (amount: number | string): string => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

/**
 * Định dạng số có dấu phân cách hàng nghìn
 * Ví dụ: 1500 -> 1.500
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("vi-VN").format(number);
};

/**
 * Rút gọn văn bản nếu quá dài
 * Ví dụ: "Máy giặt LG Inverter cao cấp..."
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
