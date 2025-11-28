interface WorkoutSessionExerciseSet {
	setNumber: number;
	reps: number;
	weightKg: number;
}

interface WorkoutSessionExercise {
	dayExerciseId: string;
	sets: WorkoutSessionExerciseSet[];
}

export interface WorkoutSessionDetails {
	id: string;
	exercises: WorkoutSessionExercise[];
}

export interface WorkoutSession {
	id: string;
	workoutPlanDayName: string;
	workoutPlanName: string;
	isFinished: boolean;
	start: Date;
	end: Date;
}
