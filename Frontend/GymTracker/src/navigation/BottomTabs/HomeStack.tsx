import { Stack } from "../AppNavigator";
import HomeScreen from "../../screens/Home/HomeScreen";
import TrackWorkoutScreen from "../../screens/WorkoutSession/TrackWorkoutScreen";

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_left" }}>
			<Stack.Screen name="HomeMain" component={HomeScreen} />
			<Stack.Screen name="TrackWorkout" component={TrackWorkoutScreen} />
		</Stack.Navigator>
	);
}
