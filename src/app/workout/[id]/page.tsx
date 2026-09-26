"use client";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  Bookmark,
  ArrowLeft,
  CheckCircle2,
  BookmarkCheck,
} from "lucide-react";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";
export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {addToTodayPlan,addToSaved,isWorkoutInPlan,isWorkoutSaved,todayPlan,} = useWorkout();

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${workoutId}`
        );
        if (!res.ok) {
          if (res.status === 404) {
            setError("Workout not found.");
          } else {
            throw new Error(`Failed to fetch workout details (${res.status})`);
          }
          return;
        }
        const data = await res.json();
        setWorkout(data);
      } catch (err: any) {
        console.error("Error fetching detail:", err);
        setError(err.message || "Failed to load workout details.");
      } finally {
        setLoading(false);
      }
    };

    if (workoutId) {
      fetchWorkoutDetail();
    }
  }, [workoutId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-6">
            <div className="w-full aspect-square bg-[#131722] border border-[#222938] rounded-2xl" />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <div className="h-10 bg-[#131722] rounded w-3/4" />
            <div className="h-5 bg-[#131722] rounded w-full" />
            <div className="h-5 bg-[#131722] rounded w-5/6" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-[#131722] rounded-full" />
              <div className="h-6 w-16 bg-[#131722] rounded-full" />
            </div>
            <div className="h-64 bg-[#131722] rounded-xl border border-[#222938]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-[#131722] border border-[#222938] rounded-2xl p-12 space-y-4">
          <h2 className="font-oswald text-3xl font-bold uppercase text-red-400">
            {error || "Workout Not Found"}
          </h2>
          <p className="text-gray-400 text-sm">
            We couldn&apos;t find the requested exercise in our library.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Workouts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inPlan = isWorkoutInPlan(workout.id);
  const inSaved = isWorkoutSaved(workout.id);
  const isPlanFull = todayPlan.length >= 5 && !inPlan;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-[#131722] border border-[#222938] px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-square rounded-2xl bg-[#131722] border border-[#222938] overflow-hidden shadow-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h1 className="font-oswald text-3xl sm:text-5xl font-extrabold uppercase tracking-wide text-white">
              {workout.name}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {workout.muscleGroups?.map((group, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#ccff00] text-black"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-[#131722] border border-[#222938] rounded-xl overflow-hidden divide-y divide-[#1c2230]">
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                EQUIPMENT
              </span>
              <span className="font-semibold text-white">
                {workout.equipment}
              </span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                DIFFICULTY
              </span>
              <span className="font-semibold text-white">
                {workout.difficulty}
              </span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                SETS
              </span>
              <span className="font-semibold text-white">{workout.sets}</span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                REPS
              </span>
              <span className="font-semibold text-white">{workout.reps}</span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                DURATION
              </span>
              <span className="font-semibold text-white">
                {workout.duration} min
              </span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                CALORIES
              </span>
              <span className="font-semibold text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400 tracking-wider uppercase">
                RATING
              </span>
              <span className="font-semibold text-amber-400">
                ★ {workout.rating}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-3">
              {workout.instructions?.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-300 leading-normal"
                >
                  <span className="font-extrabold text-[#ccff00] shrink-0 w-5">
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => addToTodayPlan(workout)}
              disabled={isPlanFull || inPlan}
              className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${inPlan
                  ? "bg-[#1c2417] text-[#ccff00] border border-[#ccff00]/40 cursor-default"
                  : isPlanFull
                    ? "bg-[#1f2636] text-gray-500 cursor-not-allowed opacity-60"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[#ccff00]/20 active:scale-[0.99]"
                }`}
            >
              {inPlan ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
                  <span>Added to Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {isPlanFull
                      ? "Plan Limit Reached (Max 5)"
                      : "Add to today's plan"}
                  </span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => addToSaved(workout)}
              disabled={inSaved}
              className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border ${inSaved
                  ? "bg-[#1a202c] text-white border-gray-600 cursor-default"
                  : "bg-transparent border-[#2e374a] text-gray-200 hover:border-[#ccff00]/60 hover:text-white hover:bg-[#161b26]"
                }`}
            >
              {inSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#ccff00]" />
                  <span>Saved for Later</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save for later</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
