import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import FeatherIcon from "react-native-vector-icons/Feather";

interface HeaderProps {
	title: string;
	onButtonClick: () => void;
}

export default function Header({ title, onButtonClick }: HeaderProps) {
	return (
		<View style={styles.headerContainer}>
			<View style={styles.sideContainer}>
				<TouchableOpacity onPress={onButtonClick}>
					<FeatherIcon name="arrow-left-circle" size={32} color="white" />
				</TouchableOpacity>
			</View>

			<Text style={styles.title}>{title}</Text>

			{/* Placeholder dla wyrównania (pusty element po prawej) */}
			<View style={styles.sideContainer} />
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		height: 90,
		backgroundColor: Colors.primary,
		marginTop: 40,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	sideContainer: {
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
		flex: 1,
	},
});
