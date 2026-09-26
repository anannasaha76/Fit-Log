"use client";
import React from "react";
import Image from "next/image";
import bannerImg from "@/assets/banner.png";
export const Hero: React.FC = () => {
  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const librarySection = document.getElementById("library");
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: "smooth" });
    }
  };
return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
    <div className="bg-[#15171D] border border-[#222630] rounded-3xl p-8 sm:p-12 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-2xl">
    <div className="lg:col-span-8 space-y-6">
    <span className="text-[#C2F800] text-xs font-extrabold tracking-widest uppercase block">WORKOUT LIBRARY</span>
    <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.08]">
      <span className="whitespace-nowrap">TRAIN WITH INTENT. LOG</span>
            <br />
            EVERY SET.</h1>
    <p className="text-[#9CA3AF] text-sm sm:text-base max-w-lg font-normal leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div className="pt-2">
        <a href="#library" onClick={handleBrowseClick} className="inline-block px-6 py-3.5 rounded-lg bg-[#C2F800] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#C2F800]/10 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              BROWSE WORKOUTS
        </a>
        </div>
        </div>
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Image src={bannerImg} alt="FitLog Trainer Banner" width={500} height={500} className="w-full h-auto object-contain drop-shadow-2xl"priority/>
      </div>
      </div>
      </div>
    </section>
  );
};