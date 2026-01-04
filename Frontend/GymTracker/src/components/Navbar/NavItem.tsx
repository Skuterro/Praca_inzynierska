import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { Route } from "@react-navigation/native";

interface NavItemProps {
	route: Route<string, object | undefined>;
	isFocused: boolean;
	onPress: () => void;
}

export default function NavItem({ route, isFocused, onPress }: NavItemProps) {
	const label = route.name;
	const iconColor = isFocused ? Colors.colorWhite : Colors.subTitle;
	let IconComponent;
	let iconName;
	let displayText = label;

	switch (route.name) {
		case "Home":
			IconComponent = Ionicons;
			iconName = isFocused ? "home" : "home-outline";
			break;
		case "Sessions":
			IconComponent = Ionicons;
			iconName = isFocused ? "calendar-sharp" : "calendar-outline";
			displayText = constants.navbar.sessions;
			break;
		case "WorkoutPlans":
			IconComponent = Ionicons;
			iconName = "barbell";
			displayText = constants.navbar.workoutPlans;
			break;
		case "Profile":
			IconComponent = FontAwesome6;
			iconName = isFocused ? "user-large" : "user";
			break;
		default:
			return null;
	}

	if (!IconComponent) return null;

	return (
		<TouchableOpacity
			key={route.key}
			onPress={onPress}
			style={[AppStyles.navItem, isFocused ? { backgroundColor: Colors.secondary } : null]}
		>
			<IconComponent name={iconName} size={24} color={iconColor} />
			{isFocused && <Text style={styles.navText}>{displayText}</Text>}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	navText: {
		fontSize: 14,
		marginLeft: 8,
		color: Colors.colorWhite,
	},
});
