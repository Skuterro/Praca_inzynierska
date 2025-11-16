import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { WorkoutPlanDay } from "../../models/WorkoutPlanDay";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

interface WorkoutDayItemProps {
	workoutDay: WorkoutPlanDay;
	onPress: () => void;
}

export const WorkoutDayItem = ({ workoutDay, onPress }: WorkoutDayItemProps) => (
	<TouchableOpacity style={styles.WorkoutDayItem} onPress={onPress}>
		<View style={styles.leftContent}>
			<Text style={styles.name}>{workoutDay.name}</Text>
			<Text style={styles.weekDay}>{workoutDay.weekDay}</Text>
		</View>
		<IonIcon name="chevron-forward" size={24} color="white" />
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
