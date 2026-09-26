"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout, PlannedWorkout } from "@/types/workout";
import { toast } from "sonner";

export interface WorkoutContextType {
  todayPlan: PlannedWorkout[];
  setTodayPlan: React.Dispatch<React.SetStateAction<PlannedWorkout[]>>;
  savedWorkouts: Workout[];
  setSavedWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  addToTodayPlan: (workout: Workout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  toggleDoneTodayPlan: (id: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  isWorkoutInPlan: (id: number) => boolean;
  isWorkoutSaved: (id: number) => boolean;
  clearPlan: () => void;
  isHydrated: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const MAX_PLAN_CAP = 5;

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<PlannedWorkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const storedPlan = localStorage.getItem("fitlog_today_plan");
        const storedSaved = localStorage.getItem("fitlog_saved_workouts");

        if (storedPlan) {
          setTodayPlan(JSON.parse(storedPlan));
        }
        if (storedSaved) {
          setSavedWorkouts(JSON.parse(storedSaved));
        }
      } catch (e) {
        console.error("Failed to load fitlog state from localStorage", e);
      } finally {
        setIsHydrated(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    }
  }, [todayPlan, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog_saved_workouts", JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isHydrated]);

  const isWorkoutInPlan = (id: number) => {
    return todayPlan.some((item) => item.id === id);
  };

  const isWorkoutSaved = (id: number) => {
    return savedWorkouts.some((item) => item.id === id);
  };

  const addToTodayPlan = (workout: Workout): boolean => {
    if (isWorkoutInPlan(workout.id)) {
      toast.error(`"${workout.name}" is already in today's plan!`);
      return false;
    }

    if (todayPlan.length >= MAX_PLAN_CAP) {
      toast.error(`Plan limit reached! Maximum ${MAX_PLAN_CAP} lifts allowed for today.`, {
        description: "Finish today's lifts or remove one to add more.",
      });
      return false;
    }

    const newPlannedItem: PlannedWorkout = {
      ...workout,
      isDone: false,
      addedAt: Date.now(),
    };

    setTodayPlan((prev) => [...prev, newPlannedItem]);
    toast.success(`Added "${workout.name}" to today's plan!`, {
      description: `Plan count: ${todayPlan.length + 1} / ${MAX_PLAN_CAP}`,
    });
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    const itemToRemove = todayPlan.find((w) => w.id === id);
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      toast.info(`Removed "${itemToRemove.name}" from today's plan.`);
    }
  };

  const toggleDoneTodayPlan = (id: number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newDone = !item.isDone;
          if (newDone) {
            toast.success(`Great job! Completed "${item.name}".`);
          } else {
            toast.info(`Marked "${item.name}" as pending.`);
          }
          return { ...item, isDone: newDone };
        }
        return item;
      })
    );
  };

  const addToSaved = (workout: Workout): boolean => {
    if (isWorkoutSaved(workout.id)) {
      toast.info(`"${workout.name}" is already saved!`);
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success(`Saved "${workout.name}" for later!`);
    return true;
  };

  const removeFromSaved = (id: number) => {
    const itemToRemove = savedWorkouts.find((w) => w.id === id);
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      toast.info(`Removed "${itemToRemove.name}" from saved list.`);
    }
  };

  const clearPlan = () => {
    setTodayPlan([]);
    toast.info("Cleared today's plan.");
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        setTodayPlan,
        savedWorkouts,
        setSavedWorkouts,
        addToTodayPlan,
        removeFromTodayPlan,
        toggleDoneTodayPlan,
        addToSaved,
        removeFromSaved,
        isWorkoutInPlan,
        isWorkoutSaved,
        clearPlan,
        isHydrated,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};

export default useWorkout;
