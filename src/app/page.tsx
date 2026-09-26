"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ArrowDown, Search, Filter } from "lucide-react";
import { Workout } from "@/types/workout";
import { WorkoutCard } from "@/components/WorkoutCard";
import { LibraryGridSkeleton } from "@/components/LoadingSkeleton";
import { SortDropdown, SortOption } from "@/components/SortDropdown";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) {
          throw new Error(`Failed to fetch workouts (${res.status})`);
        }
        const data = await res.json();
        setWorkouts(data);
      } catch (err: any) {
        console.error("Error fetching workouts:", err);
        setError(err.message || "Failed to load workout library.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);
  const allMuscleGroups = useMemo(() => {
    const groups = new Set<string>();
    workouts.forEach((w) => {
      w.muscleGroups?.forEach((g) => groups.add(g.toUpperCase()));
    });
    return ["ALL", ...Array.from(groups)];
  }, [workouts]);
  const filteredWorkouts = useMemo(() => {
    return workouts
      .filter((workout) => {
        const matchesQuery =
          workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.muscleGroups.some((g) =>
            g.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesGroup =
          selectedGroup === "ALL" ||
          workout.muscleGroups.some(
            (g) => g.toUpperCase() === selectedGroup
          );

        return matchesQuery && matchesGroup;
      })
      .sort((a, b) => {
        if (sortBy === "duration") return a.duration - b.duration;
        if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [workouts, searchQuery, selectedGroup, sortBy]);

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const librarySection = document.getElementById("library");
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <Hero />
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#1c2230]">
        <div>
        <h2 className="font-oswald text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
              THE LIBRARY</h2>
        <p className="text-gray-400 text-sm mt-1 font-medium">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131722] border border-[#222938] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>
        {!loading && workouts.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1" />
            {allMuscleGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 uppercase tracking-wider ${selectedGroup === group
                    ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10"
                    : "bg-[#131722] text-gray-400 hover:text-white border border-[#222938]"
                  }`}
              >
                {group}
              </button>
            ))}
          </div>
        )}
        {loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-400 font-medium py-2">
              <div className="w-4 h-4 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
              <span>Fetching workout library...</span>
            </div>
            <LibraryGridSkeleton />
          </div>
        )}
        {error && !loading && (
          <div className="bg-[#191014] border border-red-900/50 rounded-2xl p-8 text-center max-w-md mx-auto my-12 space-y-4">
            <p className="text-red-400 text-sm font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-lg bg-[#1c2230] text-white text-xs font-bold hover:bg-[#252e42] transition-colors"
            >
              Retry Loading
            </button>
          </div>
        )}
        {!loading && !error && (
          <>
            {filteredWorkouts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            ) : (
              <div className="bg-[#131722] border border-[#222938] rounded-2xl p-12 text-center my-8 space-y-3">
                <p className="text-gray-300 font-bold">No workouts found</p>
                <p className="text-xs text-gray-500">
                  Try adjusting your search query or muscle group filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGroup("ALL");
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#ccff00] text-black text-xs font-bold hover:bg-[#b8e600] transition-colors mt-2"
                >
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
