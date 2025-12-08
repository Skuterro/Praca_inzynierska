import { DayExercise } from "../../models/DayExercise";
import { View, Text } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";

interface ExerciseItemProps {
	exercise: DayExercise;
}

export default function ExerciseItem({ exercise }: ExerciseItemProps) {
	return (
		<View style={AppStyles.flatListItem}>
			<View style={AppStyles.itemLeftContent}>
				<Text style={AppStyles.title}>{exercise.name}</Text>
				<Text style={AppStyles.subTitle}>{exercise.bodyPart}</Text>
			</View>
			{exercise.sets && (
				<Text style={AppStyles.subTitle}>
					{exercise.sets} {constants.exercise.sets}
				</Text>
			)}
		</View>
	);
}
