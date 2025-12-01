import { Stack } from "../AppNavigator";
import TrackWorkoutScreen from "../../screens/WorkoutSession/TrackWorkoutScreen";
import HomeScreen from "../../screens/Home/HomeScreen";

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={HomeScreen} />
			<Stack.Screen name="TrackWorkout" component={TrackWorkoutScreen} />
		</Stack.Navigator>
	);
}
