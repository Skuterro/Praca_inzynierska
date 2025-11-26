import { Stack } from "../AppNavigator";
import HomeScreen from "../../screens/Home/HomeScreen";
import WorkoutSessionScreen from "../../screens/WorkoutSession/WorkoutSessionScreen";

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={HomeScreen} />
			<Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
		</Stack.Navigator>
	);
}
