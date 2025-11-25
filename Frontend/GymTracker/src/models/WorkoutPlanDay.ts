import { DayExercise } from "./DayExercise";
import { SimpleWorkoutPlanDay } from "./SimpleWorkoutPlanDay";

export interface WorkoutPlanDay extends SimpleWorkoutPlanDay {
	dayExercises: DayExercise[];
}
