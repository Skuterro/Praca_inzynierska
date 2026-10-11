import { Exercise } from "./Exercise";

export interface DayExercise extends Exercise {
	sets: number;
	minReps: number;
	maxReps: number;
}
