import { View, Text, StyleSheet } from "react-native";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";

interface BodyMetricsItemProps {
	icon: keyof typeof Ionicons.glyphMap;
	value: string;
	label: string;
}

export default function BodyMetricsItem({ icon, value, label }: BodyMetricsItemProps) {
	return (
		<View style={styles.row}>
			<Ionicons name={icon} size={26} color="#ccc" style={{ marginRight: 12 }} />
			<View style={styles.column}>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.label}>{label}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	column: {
		flexDirection: "column",
	},
	value: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	label: {
		fontSize: 14,
		color: "#aaa",
		marginTop: -2,
	},
});
