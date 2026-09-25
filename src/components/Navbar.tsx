"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImg from "@/assets/logo.png";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}
export const Navbar: React.FC<NavbarProps> = ({
  planCount = 0,
  savedCount = 0,
}) => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 bg-[#0C0D10]/95 backdrop-blur-md border-b border-[#1C1F26]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    <div className="flex items-center gap-2.5 text-white font-extrabold text-xl tracking-wider">
    <div className="w-8 h-8 rounded flex items-center justify-center">
    <Image src={logoImg} alt="FitLog Logo" width={32} height={32} className="w-8 h-8 object-contain"/>
     </div>
     <span className="font-oswald text-2xl tracking-widest text-white">FITLOG </span>
    </div>
    <nav className="flex items-center gap-2 bg-[#121620] p-1.5 rounded-full border border-[#222938]">
    <Link href="/" className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isHome
                ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10"
                : "text-gray-300 hover:text-white hover:bg-[#1a202c]"
            }`}
          >Workouts</Link>
    <Link href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isMyPlan
                ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10"
                : "text-gray-300 hover:text-white hover:bg-[#1a202c]"
            }`}>My Plan</Link>
        </nav>
        <div className="flex items-center gap-3">
       <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b26] border border-[#222938]" title="Today's Plan">
       <span className="text-xs font-semibold text-gray-300">Plan</span>
       <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-extrabold text-xs flex items-center justify-center">
      {planCount}
       </span>
     </div>
     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b26] border border-[#2e374a]" title="Saved Workouts">
     <span className="text-xs font-semibold text-gray-300">Saved</span>
     <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 font-semibold text-xs flex items-center justify-center">
      {savedCount}
     </span>
     </div>
    </div>
</div>
</header> 
); 
};