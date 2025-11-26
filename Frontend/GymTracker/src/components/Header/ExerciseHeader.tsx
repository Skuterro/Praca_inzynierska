import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseHeaderProps {
	name: string;
	setsCount: number;
	expanded: boolean;
	isFinished: boolean;
	onPress: () => void;
}

export function ExerciseHeader({ name, setsCount, expanded, isFinished, onPress }: ExerciseHeaderProps) {
	return (
		<TouchableOpacity style={styles.cardHeader} onPress={onPress} activeOpacity={0.7}>
			<View style={{ flex: 1 }}>
				<Text style={[styles.exerciseName, isFinished && { color: "#4CAF50" }]}>{name}</Text>
				<Text style={styles.subtitle}>{setsCount} sets</Text>
			</View>

			{isFinished ? (
				<Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
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
		color: "#888",
	},
});
