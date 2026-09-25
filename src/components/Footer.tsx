import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090A0D] border-t border-[#1A1D24] py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-2.5 text-white font-bold tracking-wider hover:opacity-90 transition-opacity">
          <Image src={logoImg} alt="FitLog Logo" width={24} height={24} className="w-6 h-6 object-contain"/>
          <span className="font-oswald text-lg tracking-widest text-white">FITLOG</span>
    </div>
        <p className="text-xs text-[#6B7280] font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};
