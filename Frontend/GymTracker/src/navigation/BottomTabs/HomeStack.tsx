import { Stack } from "../AppNavigator";
import HomeScreen from "../../screens/HomeScreen";

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={HomeScreen} />
		</Stack.Navigator>
	);
}
