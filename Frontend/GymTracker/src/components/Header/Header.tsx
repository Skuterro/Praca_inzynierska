import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { Colors } from "../../constants/Colors";
import FeatherIcon from "react-native-vector-icons/Feather";

interface HeaderProps {
	title: string;
	onButtonClick: () => void;
	onDelete?: () => void;
}

export default function Header({ title, onButtonClick, onDelete }: HeaderProps) {
	return (
		<View style={AppStyles.screenHeader}>
			<View style={styles.sideContainer}>
				<TouchableOpacity onPress={onButtonClick}>
					<FeatherIcon name="arrow-left-circle" size={32} color="white" />
				</TouchableOpacity>
			</View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.sideContainer}>
				{onDelete && (
					<TouchableOpacity onPress={onDelete}>
						<FeatherIcon name="trash-2" size={30} color={Colors.colorRed} />
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
		color: "white",
		textAlign: "center",
		flex: 1,
	},
});
