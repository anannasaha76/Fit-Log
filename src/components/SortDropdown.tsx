"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export type SortOption = "duration" | "caloriesBurned" | "rating";

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { label: string; value: SortOption }[] = [
    { label: "Duration", value: "duration" },
    { label: "Calories", value: "caloriesBurned" },
    { label: "Rating", value: "rating" },
  ];

  const currentLabel =
    options.find((opt) => opt.value === sortBy)?.label || "Duration";

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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-400">Sort By</span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-lg bg-[#161b26] border border-[#222938] text-xs font-semibold text-white hover:border-gray-600 transition-colors focus:outline-none"
        >
          <span>{currentLabel}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg bg-[#161b26] border border-[#222938] shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#1f2636] transition-colors ${
                sortBy === option.value
                  ? "text-[#ccff00] font-bold bg-[#1a202c]"
                  : "text-gray-300"
              }`}
            >
              <span>{option.label}</span>
              {sortBy === option.value && (
                <Check className="w-3.5 h-3.5 text-[#ccff00]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
