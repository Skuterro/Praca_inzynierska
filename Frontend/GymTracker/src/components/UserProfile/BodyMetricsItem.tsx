import { View, Text } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface BodyMetricsItemProps {
	icon: keyof typeof Ionicons.glyphMap;
	value: number | undefined;
	label: string;
	unit?: string;
}

export default function BodyMetricsItem({ icon, value, label, unit = "kg" }: BodyMetricsItemProps) {
	const displayValue = value !== undefined ? `${value} ${unit}` : " - ";

	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Ionicons name={icon} size={24} color={Colors.colorWhite} style={{ marginRight: 12 }} />
			<View style={{ flexDirection: "column" }}>
				<Text style={AppStyles.title}>{displayValue}</Text>
				<Text style={AppStyles.subTitle}>{label}</Text>
			</View>
		</View>
	);
}
