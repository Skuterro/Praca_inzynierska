import { Text, FlatList, StyleSheet } from "react-native";
import { DayExercise } from "../../models/DayExercise";
import { constants } from "../../constants/Constants";
import { Colors } from "../../constants/Colors";
import LoadingDataContainer from "../LoadingDataContainer";
import ExerciseItem from "../Exercise/ExerciseItem";

interface WorkoutContentProps {
	loading: boolean;
	exercises: DayExercise[];
}

export default function WorkoutContent({ loading, exercises }: WorkoutContentProps) {
	if (loading) {
		return <LoadingDataContainer />;
	}

	if (exercises.length === 0) {
		return <Text style={styles.restDayText}>{constants.restDay}</Text>;
	}

	return (
		<FlatList
			data={exercises}
			keyExtractor={(item) => item.id.toString()}
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
		color: Colors.subTitle,
		fontWeight: "500",
	},
});
