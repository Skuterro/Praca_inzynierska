import { Stack } from "../AppNavigator";
import WorkoutPlansScreen from "../../screens/WorkoutPlan/WorkoutPlansScreen";
import CreateWorkoutPlanScreen from "../../screens/WorkoutPlan/CreateWorkoutPlanScreen";
import WorkoutPlanDetailsScreen from "../../screens/WorkoutPlan/WorkoutPlanDetailsScreen";
import CreateWorkoutPlanDayScreen from "../../screens/WorkoutPlan/CreateWorkoutPlanDayScreen";
import WorkoutPlanDayDetailsScreen from "../../screens/WorkoutPlan/WorkoutPlanDayDetailsScreen";

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
