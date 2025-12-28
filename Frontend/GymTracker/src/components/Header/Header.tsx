import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface HeaderProps {
	title: string;
	onButtonClick: () => void;
	onDelete?: () => void;
}

export default function Header({ title, onButtonClick, onDelete }: HeaderProps) {
	return (
		<View style={AppStyles.screenHeader}>
			<View style={styles.sideContainer}>
				<TouchableOpacity onPress={onButtonClick} testID="arrow-left">
					<Feather name="arrow-left-circle" size={32} color={Colors.colorWhite} />
				</TouchableOpacity>
			</View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.sideContainer}>
				{onDelete && (
					<TouchableOpacity onPress={onDelete} testID="trash">
						<Feather name="trash-2" size={30} color={Colors.colorRed} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sideContainer: {
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		color: Colors.colorWhite,
		textAlign: "center",
		flex: 1,
	},
});
