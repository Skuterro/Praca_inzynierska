import { DayExercise } from "./DayExercise";

export interface ExerciseWithSets extends DayExercise {
	existingSets?: {
		setNumber: number;
		reps: number;
		weightKg: number;
	}[];
}
