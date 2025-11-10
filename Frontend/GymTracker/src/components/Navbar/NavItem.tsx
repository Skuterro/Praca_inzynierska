import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Route } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

interface NavItemProps {
	route: Route<string, object | undefined>;
	isFocused: boolean;
	onPress: () => void;
}

export const NavItem = ({ route, isFocused, onPress }: NavItemProps) => {
	const label = route.name;
	const iconColor = isFocused ? "white" : "gray";
	let IconComponent;
	let iconName;
	let displayText = label;

	switch (route.name) {
		case "Home":
			IconComponent = IonIcon;
			iconName = isFocused ? "home" : "home-outline";
			break;
		case "WorkoutPlans":
			IconComponent = IonIcon;
			iconName = "barbell";
			displayText = "Workout Plans";
			break;
		case "Settings":
			IconComponent = IonIcon;
			iconName = isFocused ? "settings" : "settings-outline";
			break;
		case "Profile":
			IconComponent = FeatherIcon;
			iconName = "user";
			break;
		default:
			return null;
	}

	if (!IconComponent) return null;

	return (
		<TouchableOpacity
			key={route.key}
			onPress={onPress}
			style={[styles.navItem, isFocused ? styles.navItemActive : null]}
		>
			<IconComponent name={iconName} size={24} color={iconColor} />
			{isFocused && <Text style={styles.navText}>{displayText}</Text>}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	navItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		marginHorizontal: 4,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	navItemActive: {
		backgroundColor: "#3A3A3C",
	},
	navText: {
		fontSize: 14,
		marginLeft: 8,
		color: "white",
	},
});
