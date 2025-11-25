interface WorkoutSessionExerciseSet {
	setNumber: number;
	reps: number;
	weightKg: number;
}

interface WorkoutSessionExercise {
	dayExerciseId: number;
	sets: WorkoutSessionExerciseSet[];
}

export interface WorkoutSession {
	id: number;
	exercises: WorkoutSessionExercise[];
}
