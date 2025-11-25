import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SimpleWorkoutPlanDay } from "../../models/SimpleWorkoutPlanDay";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { AppStyles } from "../../constants/AppStyles";

interface WorkoutDayItemProps {
	workoutDay: SimpleWorkoutPlanDay;
	onPress: () => void;
}

export const WorkoutDayItem = ({ workoutDay, onPress }: WorkoutDayItemProps) => (
	<TouchableOpacity style={styles.WorkoutDayItem} onPress={onPress}>
		<View style={styles.leftContent}>
			<Text style={AppStyles.title}>{workoutDay.name}</Text>
			<Text style={AppStyles.subTitle}>{workoutDay.weekDay}</Text>
		</View>
		<IonIcon name="chevron-forward" size={24} color={Colors.subTitle} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	WorkoutDayItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		borderRadius: 12,
		padding: 12,
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
	weekDay: {
		fontSize: 10,
		color: "white",
	},
});
