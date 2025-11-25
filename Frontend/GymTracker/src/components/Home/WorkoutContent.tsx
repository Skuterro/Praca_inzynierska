import { ActivityIndicator, Text, FlatList, StyleSheet } from "react-native";
import { DayExercise } from "../../models/DayExercise";
import { ExerciseItem } from "../Exercise/ExerciseItem";

interface WorkoutContentProps {
	loading: boolean;
	exercises: DayExercise[];
}

export function WorkoutContent({ loading, exercises }: WorkoutContentProps) {
	if (loading) {
		return <ActivityIndicator size="small" color="white" />;
	}

	if (exercises.length === 0) {
		return <Text style={styles.restDayText}>Rest day — no workout today</Text>;
	}

	return (
		<FlatList
			data={exercises}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <ExerciseItem exercise={item} />}
			showsVerticalScrollIndicator={false}
		/>
	);
}

const styles = StyleSheet.create({
	restDayText: {
		textAlign: "center",
		marginTop: 40,
		fontSize: 16,
		color: "#999",
		fontWeight: "500",
	},
});
