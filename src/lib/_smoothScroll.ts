"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // 1. Khởi tạo Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 2. Thiết lập vòng lặp requestAnimationFrame (raf)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Tự động cập nhật lại chiều cao trang khi nội dung thay đổi
    const resizeObserver = new ResizeObserver(() => {
      // Cách viết an toàn cho TypeScript để không bị báo đỏ
      if (lenis && typeof (lenis as any).resize === "function") {
        (lenis as any).resize();
      } else {
        // Hoặc gọi thẳng phương thức cập nhật chung
        lenis.raf(performance.now());
      }
    });
    // 4. Dọn dẹp khi component bị gỡ bỏ
    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
