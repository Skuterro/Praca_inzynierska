import { Stack } from "../AppNavigator";
import PersonalRecordsScreen from "../../screens/UserProfile/PersonalRecordsScreen";
import StrengthChartScreen from "../../screens/UserProfile/StrengthChartScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";
import ProfileScreen from "../../screens/UserProfile/ProfileScreen";

export function ProfileStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileMain" component={ProfileScreen} />
			<Stack.Screen name="PersonalRecords" component={PersonalRecordsScreen} />
			<Stack.Screen name="StrengthChart" component={StrengthChartScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
}
