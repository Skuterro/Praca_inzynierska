import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { WorkoutPlan } from "../../models/WorkoutPlan";
import { Colors } from "../../constants/Colors";
import { AppStyles } from "../../constants/AppStyles";

interface PlanItemProps {
	plan: WorkoutPlan;
	onPress: () => void;
}

export const PlanItem = ({ plan, onPress }: PlanItemProps) => (
	<TouchableOpacity style={styles.planItem} onPress={onPress}>
		<View style={styles.leftContent}>
			<Text style={AppStyles.title}>{plan.name}</Text>
			{plan.isActive && <Text style={styles.activeLabel}>Active</Text>}
		</View>
		<IonIcon name="chevron-forward" size={24} color={Colors.subTitle} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	flatListContent: {
		paddingBottom: 20,
	},
	planItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		borderRadius: 12,
		padding: 15,
		marginBottom: 12,
	},
	leftContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	planName: {
		fontSize: 18,
		fontWeight: "600",
		color: "white",
	},
	planDetails: {
		fontSize: 14,
		color: "white",
		marginTop: 4,
	},
	activeLabel: {
		color: "#4CAF50",
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 10,
	},
});
