import { Stack } from "../Stack";
import WorkoutSessionScreen from "../../screens/WorkoutSession/WorkoutSessionScreen";
import TrackWorkoutScreen from "../../screens/WorkoutSession/TrackWorkoutScreen";

export function WorkoutSessionStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="WorkoutSessions" component={WorkoutSessionScreen} />
			<Stack.Screen name="TrackWorkout" component={TrackWorkoutScreen} />
		</Stack.Navigator>
	);
}
