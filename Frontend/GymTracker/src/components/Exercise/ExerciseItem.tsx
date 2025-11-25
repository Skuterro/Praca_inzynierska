import { View, Text, StyleSheet } from "react-native";
import { DayExercise } from "../../models/DayExercise";
import { Colors } from "../../constants/Colors";
import { AppStyles } from "../../constants/AppStyles";

interface ExerciseItemProps {
	exercise: DayExercise;
}

export const ExerciseItem = ({ exercise }: ExerciseItemProps) => (
	<View style={styles.exerciseItemContainer}>
		<View style={styles.leftContent}>
			<Text style={AppStyles.title}>{exercise.name}</Text>
			<Text style={AppStyles.subTitle}>{exercise.bodyPart}</Text>
		</View>
		{exercise.sets && <Text style={AppStyles.subTitle}>{exercise.sets} sets</Text>}
	</View>
);

const styles = StyleSheet.create({
	exerciseItemContainer: {
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
});
