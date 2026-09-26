export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number; // in minutes
  caloriesBurned: number; // in kcal
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlannedWorkout extends Workout {
  isDone?: boolean;
  addedAt: number;
}
