import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface ListHeaderProps {
	title?: string;
	buttonTitle: string;
	disabled?: boolean;
	onButtonClick?: () => void;
}

export default function ListHeader({ title, buttonTitle, disabled, onButtonClick }: ListHeaderProps) {
	return (
		<View style={styles.sectionHeader}>
			{title && <Text style={styles.sectionTitle}>{title}</Text>}
			<TouchableOpacity
				style={[styles.button, disabled && { opacity: 0.4 }]}
				disabled={disabled}
				onPress={onButtonClick}
				activeOpacity={disabled ? 1 : 0.7}
			>
				<Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{buttonTitle}</Text>
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
	button: {
		backgroundColor: Colors.colorYellow,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	buttonText: {
		color: "black",
		fontWeight: "600",
		fontSize: 14,
	},
	buttonTextDisabled: {
		color: "#333",
	},
});
