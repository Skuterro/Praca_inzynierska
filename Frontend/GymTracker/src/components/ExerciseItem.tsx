import { View, Text, StyleSheet } from "react-native";
import { DayExercise } from "../models/DayExercise";
import { Colors } from "../constants/Colors";

interface ExerciseItemProps {
	exercise: DayExercise;
}

export const ExerciseItem = ({ exercise }: ExerciseItemProps) => (
	<View style={styles.mainContainer}>
		<View style={styles.leftContent}>
			<Text style={styles.name}>{exercise.name}</Text>
			<Text style={styles.bodyPart}>{exercise.bodyPart}</Text>
		</View>
		{exercise.sets && <Text style={styles.name}>{exercise.sets} sets</Text>}
	</View>
);

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		borderRadius: 12,
		padding: 15,
		marginBottom: 12,
	},
	leftContent: {
		flexDirection: "column",
		alignItems: "flex-start",
		gap: 10,
	},
	name: {
		fontSize: 18,
		color: "white",
	},
	bodyPart: {
		fontSize: 10,
		color: "white",
	},
});
