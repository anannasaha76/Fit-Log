"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import logoImg from "@/assets/logo.png";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isHydrated } = useWorkout();
  const planCount = isHydrated ? todayPlan.length : 0;
  const savedCount = isHydrated ? savedWorkouts.length : 0;
  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";
return (
    <header className="sticky top-0 z-50 bg-[#0C0D10]/95 backdrop-blur-md border-b border-[#1C1F26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-white font-extrabold text-xl tracking-wider">
        <div className="w-8 h-8 rounded flex items-center justify-center">
        <Image src={logoImg} alt="FitLog Logo" width={32} height={32} className="w-8 h-8 object-contain"/>
        </div>
        <span className="font-oswald text-2xl tracking-widest text-white">FITLOG</span>
        </div>

        <nav className="flex items-center gap-2 p-1.5 ">
          <Link href="/" className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isHome
                ? "bg-[#1A2312] text-[#C2F800]"
                : "text-[#9CA3AF]"
            }`}>Workouts</Link>
          <Link href="/my-plan" className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isMyPlan
                ? "bg-[#1A2312] text-[#C2F800]"
                : "text-[#9CA3AF]"
            }`}>My Plan</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group" title="Go to Today's Plan">
            <span className="text-xs font-semibold text-[#D1D5DB]">
              Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#C2F800] text-black font-extrabold text-xs flex items-center justify-center">
              {planCount}</span>
          </div>
         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group" title="Go to Saved Workouts">
            <span className="text-xs font-semibold text-[#9CA3AF]">
              Saved</span>
            <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 font-semibold text-xs flex items-center justify-center group-hover:border-gray-400 group-hover:text-white">
              {savedCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
