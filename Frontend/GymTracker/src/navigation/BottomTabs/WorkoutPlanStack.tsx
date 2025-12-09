import { Stack } from "../Stack";
import WorkoutPlanDayDetailsScreen from "../../screens/WorkoutPlan/WorkoutPlanDayDetailsScreen";
import CreateWorkoutPlanDayScreen from "../../screens/WorkoutPlan/CreateWorkoutPlanDayScreen";
import WorkoutPlanDetailsScreen from "../../screens/WorkoutPlan/WorkoutPlanDetailsScreen";
import CreateWorkoutPlanScreen from "../../screens/WorkoutPlan/CreateWorkoutPlanScreen";
import WorkoutPlansScreen from "../../screens/WorkoutPlan/WorkoutPlansScreen";

export function WorkoutPlansStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="WorkoutPlansMain" component={WorkoutPlansScreen} />
			<Stack.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlanScreen} />
			<Stack.Screen name="WorkoutPlanDetails" component={WorkoutPlanDetailsScreen} />
			<Stack.Screen name="WorkoutPlanDayDetails" component={WorkoutPlanDayDetailsScreen} />
			<Stack.Screen name="CreateWorkoutPlanDay" component={CreateWorkoutPlanDayScreen} />
		</Stack.Navigator>
	);
}
