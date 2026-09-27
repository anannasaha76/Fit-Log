import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-[#131722] border border-[#222938] rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center mx-auto">
          <Image
            src={logoImg}
            alt="FitLog Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>

        <div className="space-y-2">
          <span className="font-oswald text-6xl font-extrabold text-[#ccff00] tracking-widest block">
            404
          </span>
          <h2 className="font-oswald text-2xl font-bold uppercase text-white tracking-wider">
            PAGE NOT FOUND
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            The lift or route you are looking for doesn&apos;t exist or has been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#ccff00]/10"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Go to Workouts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
