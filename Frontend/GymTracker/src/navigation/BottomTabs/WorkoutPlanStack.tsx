import { Stack } from "../AppNavigator";
import WorkoutPlansScreen from "../../screens/WorkoutPlan/WorkoutPlansScreen";
import CreateWorkoutPlanScreen from "../../screens/WorkoutPlan/CreateWorkoutPlanScreen";

export function WorkoutPlansStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="WorkoutPlansMain" component={WorkoutPlansScreen} />
			<Stack.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlanScreen} />
		</Stack.Navigator>
	);
}
