import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ListHeaderProps {
	title: string;
	buttonTitle: string;
	onButtonClick?: () => void;
}

export default function ListHeader({ title, buttonTitle, onButtonClick }: ListHeaderProps) {
	return (
		<View style={styles.sectionHeader}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<TouchableOpacity style={styles.addButton} onPress={onButtonClick}>
				<Text style={styles.addButtonText}>{buttonTitle}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},

	addButton: {
		backgroundColor: "#ffc107",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},

	addButtonText: {
		color: "black",
		fontWeight: "600",
		fontSize: 14,
	},
});
