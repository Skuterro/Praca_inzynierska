import { LayoutAnimation } from "react-native";
import { ExerciseWithSets } from "../../models/ExerciseWithSets";
import { useEffect, useState } from "react";

export function useExerciseSets(
	exercise: ExerciseWithSets,
	onSave: (dayExerciseId: number, setNumber: number, reps: number, weight: number) => Promise<void>
) {
	const [expanded, setExpanded] = useState(false);
	const [sets, setSets] = useState(() =>
		Array.from({ length: exercise.sets }).map((_, index) => {
			const saved = exercise.existingSets?.find((s) => s.setNumber === index + 1);
			return {
				reps: saved ? String(saved.reps) : "",
				weight: saved ? String(saved.weightKg) : "",
				isSaved: !!saved,
				isLoading: false,
			};
		})
	);
	const isExerciseFinished = sets.every((s) => s.isSaved);

	const toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded(!expanded);
	};

	const updateSet = (index: number, field: "reps" | "weight", value: string) => {
		setSets((prev) => {
			const updated = [...prev];
			updated[index][field] = value;
			return updated;
		});
	};

	const saveSet = async (index: number) => {
		const currentSet = sets[index];
		if (!currentSet.reps || !currentSet.weight) return;
		const newSets = [...sets];
		newSets[index].isLoading = true;
		setSets(newSets);
		try {
			await onSave(Number(exercise.id), index + 1, Number(currentSet.reps), Number(currentSet.weight));
			const updatedSets = [...sets];
			updatedSets[index].isLoading = false;
			updatedSets[index].isSaved = true;
			setSets(updatedSets);
			const allFinished = updatedSets.every((s) => s.isSaved);
			if (allFinished) {
				setTimeout(() => {
					LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
					setExpanded(false);
				}, 500);
			}
		} finally {
		}
	};

	useEffect(() => {}, []);

	return {
		expanded,
		sets,
		isExerciseFinished,
		updateSet,
		saveSet,
		toggleExpand,
	};
}
