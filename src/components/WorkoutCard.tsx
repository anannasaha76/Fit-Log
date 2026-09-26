"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";
interface WorkoutCardProps {
  workout: Workout;
}
export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#131722] border border-[#222938] rounded-xl overflow-hidden flex flex-col hover:border-[#ccff00]/50 hover:shadow-xl hover:shadow-[#ccff00]/5 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative w-full h-52 bg-[#1a202c] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          priority={workout.id <= 3}
          unoptimized
        />
      </div>
      <div className="px-5 pt-4 flex flex-wrap gap-1.5">
        {workout.muscleGroups.map((group, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-[#ccff00] text-black shadow-sm"
          >
            {group}
          </span>
        ))}
      </div>
      <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-oswald text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors line-clamp-1">
            {workout.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 mb-4 font-medium line-clamp-1">
            {workout.equipment}
          </p>
        </div>
        <div className="pt-3 border-t border-[#1f2636] flex items-center justify-between text-xs text-gray-300 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};