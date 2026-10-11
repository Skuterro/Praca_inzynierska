import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface ExerciseHeaderProps {
	name: string;
	setsCount: number;
	expanded: boolean;
	isFinished: boolean;
	onPress: () => void;
	minReps?: number;
	maxReps?: number;
}

export default function ExerciseHeader({
	name,
	setsCount,
	expanded,
	isFinished,
	onPress,
	minReps,
	maxReps,
}: ExerciseHeaderProps) {
	const getSubtitle = () => {
		if (minReps && maxReps) {
			const repsText = minReps === maxReps ? `${minReps} reps` : `${minReps}-${maxReps} reps`;
			return `${setsCount} sets • ${repsText}`;
		}
		return `${setsCount} sets`;
	};

	return (
		<TouchableOpacity style={styles.cardHeader} onPress={onPress} activeOpacity={0.7}>
			<View style={{ flex: 1 }}>
				<Text style={[styles.exerciseName, isFinished && { color: Colors.colorGreen }]}>{name}</Text>
				<Text style={styles.subtitle}>{getSubtitle()}</Text>
			</View>

			{isFinished ? (
				<Ionicons name="checkmark-circle" size={28} color={Colors.colorGreen} />
			) : (
				<Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#666" />
			)}
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	cardHeader: {
		flexDirection: "row",
		padding: 16,
		alignItems: "center",
		justifyContent: "space-between",
	},
	exerciseName: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 12,
		color: Colors.subTitle,
	},
});
