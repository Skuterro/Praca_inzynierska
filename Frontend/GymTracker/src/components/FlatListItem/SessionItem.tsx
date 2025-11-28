import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WorkoutSession } from "../../models/WorkoutSession";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface SessionItemProps {
	session: WorkoutSession;
	onPress: () => void;
}

export function SessionItem({ session, onPress }: SessionItemProps) {
	const statusColor = session.isFinished ? "green" : "red";
	const statusText = session.isFinished ? "Finished" : "Unfinished";

	const formatDMY = (date: Date) => {
		const d = String(date.getDate()).padStart(2, "0");
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const y = date.getFullYear();
		return `${d}-${m}-${y}`;
	};

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={onPress}>
			<View style={styles.leftSection}>
				<Text style={AppStyles.title}>
					{session.workoutPlanDayName} ({formatDMY(new Date(session.start))})
				</Text>
				<Text style={AppStyles.subTitle}>{session.workoutPlanName}</Text>
			</View>

			<Text style={[styles.status, { color: statusColor }]}>{statusText}</Text>

			<Ionicons name="chevron-forward" size={22} color="white" style={styles.icon} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		padding: 15,
		borderRadius: 10,
		marginBottom: 12,
	},
	leftSection: {
		flex: 1,
	},
	status: {
		fontSize: 14,
		fontWeight: "600",
		marginRight: 10,
	},
	icon: {
		alignSelf: "center",
	},
});
