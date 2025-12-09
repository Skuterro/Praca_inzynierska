import { Stack } from "../Stack";
import PersonalRecordsScreen from "../../screens/UserProfile/PersonalRecordsScreen";
import StrengthChartScreen from "../../screens/UserProfile/StrengthChartScreen";
import ProfileScreen from "../../screens/UserProfile/ProfileScreen";

export function ProfileStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileMain" component={ProfileScreen} />
			<Stack.Screen name="PersonalRecords" component={PersonalRecordsScreen} />
			<Stack.Screen name="StrengthChart" component={StrengthChartScreen} />
		</Stack.Navigator>
	);
}
