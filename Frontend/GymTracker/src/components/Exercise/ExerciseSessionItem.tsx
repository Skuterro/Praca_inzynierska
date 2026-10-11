import { View, StyleSheet, Text } from "react-native";
import { ExerciseWithSets } from "../../models/ExerciseWithSets";
import { useExerciseSets } from "../../hooks/workoutSessionScreen/useExerciseSets";
import { Colors } from "../../constants/Colors";
import ExerciseHeader from "../Header/ExerciseHeader";
import ExerciseSetRow from "./ExerciseSetRow";

interface ExerciseSessionItemProps {
	exercise: ExerciseWithSets;
	onSave: (dayExerciseId: number, setNumber: number, reps: number, weight: number) => Promise<void>;
}

export default function ExerciseSessionItem({ exercise, onSave }: ExerciseSessionItemProps) {
	const { expanded, sets, toggleExpand, updateSet, saveSet, isExerciseFinished } = useExerciseSets(exercise, onSave);

	return (
		<View style={styles.card}>
			<ExerciseHeader
				name={exercise.name}
				setsCount={sets.length}
				expanded={expanded}
				isFinished={isExerciseFinished}
				onPress={toggleExpand}
				minReps={exercise.minReps}
				maxReps={exercise.maxReps}
			/>

			{expanded && (
				<View style={styles.setsContainer}>
					<View style={styles.labelsContainer}>
						<View style={styles.colSpacerLeft} />
						<Text style={styles.label}>Reps</Text>
						<Text style={styles.label}>Kg</Text>
						<View style={styles.colSpacerRight} />
					</View>
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
		backgroundColor: Colors.colorDarkGray,
		marginVertical: 8,
		borderRadius: 12,
		overflow: "hidden",
	},
	setsContainer: {
		padding: 16,
		backgroundColor: Colors.colorDarkGray,
	},
	labelsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
		paddingHorizontal: 6,
	},
	label: {
		flex: 1,
		color: Colors.subTitle,
		fontSize: 12,
		textAlign: "center",
	},
	colSpacerLeft: {
		width: 20,
	},
	colSpacerRight: {
		width: 45,
	},
});
