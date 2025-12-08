interface WorkoutSessionExerciseSet {
	setNumber: number;
	reps: number;
	weightKg: number;
}

interface WorkoutSessionExercise {
	dayExerciseId: number;
	sets: WorkoutSessionExerciseSet[];
}

export interface WorkoutSessionDetails {
	id: number;
	isFinished: boolean;
	exercises: WorkoutSessionExercise[];
}

export interface WorkoutSession {
	id: number;
	workoutPlanDayName: string;
	workoutPlanDayId: number;
	workoutPlanName: string;
	isFinished: boolean;
	start: Date;
}
