import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WorkoutSession } from "../../models/WorkoutSession";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import formatDate from "../../utils/FormatDate";

interface SessionItemProps {
	session: WorkoutSession;
	onPress: () => void;
}

export default function SessionItem({ session, onPress }: SessionItemProps) {
	const statusColor = session.isFinished ? Colors.colorGreen : Colors.colorRed;
	const statusText = session.isFinished ? "Finished" : "Unfinished";

	return (
		<TouchableOpacity style={AppStyles.flatListItem} onPress={onPress}>
			<View style={{ flex: 1 }}>
				<Text style={AppStyles.title}>
					{session.workoutPlanDayName} ({formatDate(new Date(session.start))})
				</Text>
				<Text style={AppStyles.subTitle}>{session.workoutPlanName}</Text>
			</View>

			<Text style={[styles.status, { color: statusColor }]}>{statusText}</Text>

			<Ionicons name="chevron-forward" size={22} color={Colors.colorWhite} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	status: {
		fontSize: 14,
		fontWeight: "600",
		marginRight: 10,
	},
});
