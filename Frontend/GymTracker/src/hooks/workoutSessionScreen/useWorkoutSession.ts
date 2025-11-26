import { useState, useEffect } from "react";
import { ExerciseWithSets } from "../../models/ExerciseWithSets";
import { DayExercise } from "../../models/DayExercise";
import WorkoutSessionService from "../../api/Services/WorkoutSessionService";

export function useWorkoutSession(sessionId: number, exercises: DayExercise[]) {
	const [loading, setLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isFinishing, setIsFinishing] = useState(false);
	const [exerciseList, setExerciseList] = useState<ExerciseWithSets[]>([]);

	const loadSessionData = async () => {
		try {
			setLoading(true);
			const response = await WorkoutSessionService.getWorkoutSessionDetials(sessionId);

			const filledExercises: ExerciseWithSets[] = exercises.map((ex) => {
				const existing = response.exercises.find((x) => x.dayExerciseId === Number(ex.id));

				const mappedSets = existing
					? existing.sets.map((s) => ({
							setNumber: s.setNumber,
							reps: s.reps,
							weightKg: s.weightKg,
					  }))
					: [];

				return {
					...ex,
					existingSets: mappedSets,
				};
			});

			setExerciseList(filledExercises);
		} finally {
			setLoading(false);
		}
	};

	const addSet = async (exerciseId: number, setNr: number, reps: number, weight: number) => {
		try {
			setIsSaving(true);
			await WorkoutSessionService.addSet(sessionId, exerciseId, setNr, reps, weight);
		} finally {
			setIsSaving(false);
		}
	};

	const finishWorkout = async () => {
		setIsFinishing(true);
		try {
			await WorkoutSessionService.finishWorkoutSession(sessionId);
		} finally {
			setIsFinishing(false);
		}
	};

	useEffect(() => {
		loadSessionData();
	}, []);

	return {
		loading,
		isSaving,
		isFinishing,
		exerciseList,
		addSet,
		finishWorkout,
	};
}
