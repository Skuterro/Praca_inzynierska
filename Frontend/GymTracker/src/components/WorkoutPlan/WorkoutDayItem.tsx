import { TouchableOpacity, View, Text } from "react-native";
import { SimpleWorkoutPlanDay } from "../../models/SimpleWorkoutPlanDay";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface WorkoutDayItemProps {
	workoutDay: SimpleWorkoutPlanDay;
	onPress: () => void;
}

export const WorkoutDayItem = ({ workoutDay, onPress }: WorkoutDayItemProps) => (
	<TouchableOpacity style={AppStyles.flatListItem} onPress={onPress}>
		<View style={AppStyles.itemLeftContent}>
			<Text style={AppStyles.title}>{workoutDay.name}</Text>
			<Text style={AppStyles.subTitle}>{workoutDay.weekDay}</Text>
		</View>
		<Ionicons name="chevron-forward" size={24} color={Colors.subTitle} />
	</TouchableOpacity>
);
