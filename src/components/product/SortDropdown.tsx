"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Mặc định");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["Mặc định", "Giá thấp - cao", "Giá cao - thấp"];

  // Tự động đóng menu khi click ra ngoài vùng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent text-white text-xs uppercase tracking-widest font-bold focus:outline-none cursor-pointer group"
      >
        {selected}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#C9A63F]" : "group-hover:text-[#C9A63F]"}`}
        />
      </button>

      {/* Danh sách thả xuống */}
      {isOpen && (
        <ul className="absolute right-0 top-full mt-4 w-56 bg-[#0A0A0A] border border-white/10 rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 py-3 animate-in fade-in slide-in-from-top-2">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                // Sau này bạn có thể viết thêm logic sắp xếp sản phẩm ở đây
              }}
              className={`px-6 py-3 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                selected === option
                  ? "text-[#C9A63F] bg-white/5 font-black"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
