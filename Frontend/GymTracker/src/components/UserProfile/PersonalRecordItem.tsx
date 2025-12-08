import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface PersonalRecordItemProps {
	value: number | undefined;
	label: string;
	onPress: () => void;
}

export default function PersonalRecordItem({ value, label, onPress }: PersonalRecordItemProps) {
	const displayValue = value !== undefined ? `${value} kg` : " - ";

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<Ionicons name="star-outline" size={24} color={Colors.colorWhite} style={{ marginRight: 12 }} />
				<View style={{ flexDirection: "column" }}>
					<Text style={AppStyles.title}>{displayValue}</Text>
					<Text style={AppStyles.subTitle}>{label}</Text>
				</View>
			</View>
			<TouchableOpacity style={AppStyles.classicButton} onPress={onPress}>
				<Ionicons name="chevron-forward" size={18} color="black" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
});
