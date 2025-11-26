import { View, StyleSheet } from "react-native";
import { ExerciseWithSets } from "../../models/ExerciseWithSets";
import { useExerciseSets } from "../../hooks/workoutSessionScreen/useExerciseSets";
import { ExerciseHeader } from "../Header/ExerciseHeader";
import { ExerciseSetRow } from "./ExerciseSetRow";

interface ExerciseSessionItemProps {
	exercise: ExerciseWithSets;
	onSave: (dayExerciseId: number, setNumber: number, reps: number, weight: number) => Promise<void>;
}

export default function ExerciseSessionItem({ exercise, onSave }: ExerciseSessionItemProps) {
	const { expanded, toggleExpand, sets, updateSet, saveSet, isExerciseFinished } = useExerciseSets(exercise, onSave);

	return (
		<View style={styles.card}>
			<ExerciseHeader
				name={exercise.name}
				setsCount={sets.length}
				expanded={expanded}
				isFinished={isExerciseFinished}
				onPress={toggleExpand}
			/>

			{expanded && (
				<View style={styles.setsContainer}>
					{sets.map((s, i) => (
						<ExerciseSetRow
							key={i}
							index={i}
							reps={s.reps}
							weight={s.weight}
							isSaved={s.isSaved}
							isLoading={s.isLoading}
							onChange={(field, val) => updateSet(i, field, val)}
							onSave={() => saveSet(i)}
						/>
					))}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#1E1E1E",
		marginVertical: 8,
		borderRadius: 12,
		overflow: "hidden",
	},
	setsContainer: {
		padding: 16,
		paddingTop: 0,
		backgroundColor: "#1E1E1E",
	},
	rowHeader: {
		flexDirection: "row",
		marginBottom: 10,
	},
	colHeader: {
		flex: 1,
		color: "#666",
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "center",
	},
});
