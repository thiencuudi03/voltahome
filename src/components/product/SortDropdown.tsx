"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Thêm interface để nhận hàm callback từ component cha
interface SortDropdownProps {
  onSortChange: (option: string) => void;
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
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

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSortChange(option); // Gọi hàm để báo về cho Products/page.tsx
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        suppressHydrationWarning // THÊM DÒNG NÀY ĐỂ FIX LỖI HYDRATION
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
              onClick={() => handleSelect(option)}
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
