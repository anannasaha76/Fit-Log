"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import logoImg from "@/assets/logo.png";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isHydrated } = useWorkout();
  const [mobileOpen, setMobileOpen] = useState(false);

  const planCount = isHydrated ? todayPlan.length : 0;
  const savedCount = isHydrated ? savedWorkouts.length : 0;
  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  const navLinkClass = (active: boolean) =>
    `px-4 sm:px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
      active ? "bg-[#1A2312] text-[#C2F800]" : "text-[#9CA3AF] hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#0C0D10]/95 backdrop-blur-md border-b border-[#1C1F26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 text-white font-extrabold text-xl tracking-wider shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center shrink-0">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <span className="font-oswald text-xl sm:text-2xl tracking-widest text-white">
            FITLOG
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-2 p-1.5">
          <Link href="/" className={navLinkClass(isHome)}>
            Workouts
          </Link>
          <Link href="/my-plan" className={navLinkClass(isMyPlan)}>
            My Plan
          </Link>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Plan / Saved badges — compact on small screens */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group" title="Go to Today's Plan">
            <span className="text-xs font-semibold text-[#D1D5DB]">Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#C2F800] text-black font-extrabold text-xs flex items-center justify-center">
              {planCount}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group" title="Go to Saved Workouts">
            <span className="text-xs font-semibold text-[#9CA3AF]">Saved</span>
            <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 font-semibold text-xs flex items-center justify-center group-hover:border-gray-400 group-hover:text-white">
              {savedCount}
            </span>
          </div>
          <div className="flex sm:hidden items-center gap-1.5">
            <span
              className="w-6 h-6 rounded-full bg-[#C2F800] text-black font-extrabold text-[11px] flex items-center justify-center"
              title="Today's Plan"
            >
              {planCount}
            </span>
            <span
              className="w-6 h-6 rounded-full border border-gray-600 text-gray-300 font-semibold text-[11px] flex items-center justify-center"
              title="Saved Workouts"
            >
              {savedCount}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#D1D5DB] hover:text-white transition-colors"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1C1F26] bg-[#0C0D10] px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isHome ? "bg-[#1A2312] text-[#C2F800]" : "text-[#9CA3AF]"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isMyPlan ? "bg-[#1A2312] text-[#C2F800]" : "text-[#9CA3AF]"
              }`}
            >
              My Plan
            </Link>
          </nav>
          <div className="flex sm:hidden items-center gap-3 mt-3 pt-3 border-t border-[#1C1F26]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-[#D1D5DB]">Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#C2F800] text-black font-extrabold text-xs flex items-center justify-center">
                {planCount}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-[#9CA3AF]">Saved</span>
              <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 font-semibold text-xs flex items-center justify-center">
                {savedCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};