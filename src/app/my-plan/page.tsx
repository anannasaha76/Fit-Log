"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  Search,
  ArrowRight,
  CheckCircle2,
  ListTodo,
  Bookmark,
} from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { SortDropdown, SortOption } from "@/components/SortDropdown";
import { PlanListSkeleton } from "@/components/LoadingSkeleton";
import { PlannedWorkout, Workout } from "@/types/workout";
export default function MyPlanPage() {
  const {todayPlan,savedWorkouts,removeFromTodayPlan,toggleDoneTodayPlan,removeFromSaved,isHydrated,} = useWorkout();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;
  const totalExercises = currentList.length;
  const totalMinutes = useMemo(
    () => currentList.reduce((acc, item) => acc + (item.duration || 0), 0),
    [currentList]
  );
  const totalCalories = useMemo(
    () => currentList.reduce((acc, item) => acc + (item.caloriesBurned || 0), 0),
    [currentList]
  );
  const sortedAndFilteredList = useMemo(() => {
    return currentList
      .filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.equipment.toLowerCase().includes(q) ||
          item.muscleGroups.some((g) => g.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === "duration") return a.duration - b.duration;
        if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [currentList, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
      <h1 className="font-oswald text-4xl sm:text-5xl font-extrabold uppercase tracking-wide text-white">MY PLAN</h1>
      <p className="text-gray-400 text-sm mt-1.5 font-medium">Cap of five lifts for today. Finish them, then load more.</p>
      </div>
      <div className="bg-[#131722] border border-[#222938] rounded-2xl p-6 sm:p-8 grid grid-cols-3 gap-4 sm:gap-8 divide-x divide-[#1c2230] shadow-xl">
        <div className="space-y-1 pr-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Exercises</span>
          <span className="font-oswald text-3xl sm:text-5xl font-extrabold text-[#ccff00] block">{isHydrated ? totalExercises : 0}</span>
        </div>
    <div className="space-y-1 pl-4 sm:pl-8 pr-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Minutes</span>
        <span className="font-oswald text-3xl sm:text-5xl font-extrabold text-white block">{isHydrated ? totalMinutes : 0}</span>
        </div>
  <div className="space-y-1 pl-4 sm:pl-8">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Calories</span>
      <span className="font-oswald text-3xl sm:text-5xl font-extrabold text-white block">{isHydrated ? totalCalories : 0}</span>
      </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="inline-flex items-center bg-[#131722] border border-[#222938] p-1.5 rounded-xl self-start">
          <button type="button" onClick={() => setActiveTab("today")} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "today"
                ? "bg-[#1f2636] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >Today&apos;s Plan</button>
          <button type="button" onClick={() => setActiveTab("saved")} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "saved"
                ? "bg-[#1f2636] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}>Saved</button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search plan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131722] border border-[#222938] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]"
            />
          </div>
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>
      {!isHydrated && (
        <div className="space-y-4">
          <p className="text-xs text-gray-400 font-medium">Loading workouts…</p>
          <PlanListSkeleton />
        </div>
      )}
      {isHydrated && (
        <div className="space-y-4">
        {sortedAndFilteredList.length > 0 ? (
          sortedAndFilteredList.map((item) => {
            const isPlannedItem = activeTab === "today";
            const plannedWorkout = item as PlannedWorkout;

      return (
                <div
                  key={item.id}
                  className={`bg-[#131722] border rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${
                    plannedWorkout.isDone
                      ? "border-green-800/40 bg-[#11171d]/80 opacity-90"
                      : "border-[#222938] hover:border-[#2a3346]"
                  }`}>
                  <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-24 sm:w-28 h-20 rounded-lg overflow-hidden bg-[#1c2230] shrink-0 border border-[#222938]">
                <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" unoptimized/>
                {plannedWorkout.isDone && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-[#ccff00]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-oswald text-lg font-bold uppercase tracking-wide ${
                            plannedWorkout.isDone
                              ? "line-through text-gray-400"
                              : "text-white"
                          }`} >{item.name}</h3>
                        {plannedWorkout.isDone && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-green-950 text-green-400 border border-green-800/50">Done</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-medium">
                        {item.equipment}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-300 pt-1 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                          {item.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                          {item.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3. text-[#ccff00]" />
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#1f2636]">
                    <Link
                      href={`/workout/${item.id}`}
                      className="px-4 py-2 rounded-xl bg-[#161b26] border border-[#222938] text-gray-200 hover:text-white hover:border-gray-500 text-xs font-bold transition-all flex items-center gap-1.5">
                      View Details
                    </Link>
          {isPlannedItem && (
                      <button
                        type="button"
                        onClick={() => toggleDoneTodayPlan(item.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                          plannedWorkout.isDone
                            ? "bg-[#1c2417] text-[#ccff00] border border-[#ccff00]/40"
                            : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[#ccff00]/10 active:scale-[0.98]"
                        }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>{plannedWorkout.isDone ? "Done" : "Mark as Done"}
                        </span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (isPlannedItem) {
                          removeFromTodayPlan(item.id);
                        } else {
                          removeFromSaved(item.id);
                        }
                      }}
                      className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Remove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-[#131722] border border-dashed border-[#222938] rounded-2xl py-16 px-6 text-center space-y-4 my-6">
              <div className="w-12 h-12 rounded-full bg-[#1c2230] text-[#ccff00] flex items-center justify-center mx-auto">
                {activeTab === "today" ? (
                  <ListTodo className="w-6 h-6" />
                ) : (
                  <Bookmark className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-oswald text-2xl font-extrabold uppercase tracking-wide text-white">
                  NOTHING HERE YET
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">
                  {activeTab === "today"
                    ? "Browse the library and add a lift to get today moving."
                    : "No saved workouts yet. Save lifts from the library for quick access."}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#ccff00]/10"
                >
                  <span>Go to workouts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
