import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkoutSessionStack } from "./BottomTabs/WorkoutSessionStack";
import { NavigationContainer } from "@react-navigation/native";
import { ExerciseRecordEnum } from "../models/enums/ExerciseRecordEnum";
import { WorkoutPlansStack } from "./BottomTabs/WorkoutPlanStack";
import { PersonalRecord } from "../models/PersonalRecord";
import { ProfileStack } from "./BottomTabs/ProfileStack";
import { DayExercise } from "../models/DayExercise";
import { HomeStack } from "./BottomTabs/HomeStack";
import { AuthStack } from "./BottomTabs/AuthStack";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar/Navbar";

export type RootStackParamList = {
	HomeMain: undefined;
	WorkoutPlansMain: undefined;
	WorkoutPlanDetails: { planId: number; planName: string; isActive: boolean };
	WorkoutPlanDayDetails: { dayId: number; dayName: string };
	WorkoutSessions: undefined;
	TrackWorkout: { exercises: DayExercise[]; sessionId: number };
	CreateWorkoutPlan: undefined;
	CreateWorkoutPlanDay: { planId: number; existingDays: string[] };
	ProfileMain: undefined;
	PersonalRecords: { personalRecordExercise: ExerciseRecordEnum };
	StrengthChart: { records: PersonalRecord[] };
	Settings: undefined;
	Login: undefined;
	Register: undefined;
};

export type RootTabParamList = {
	Home: undefined;
	Sessions: undefined;
	WorkoutPlans: undefined;
	Profile: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{user ? (
				<Tab.Navigator tabBar={(props) => <Navbar {...props} />} screenOptions={{ headerShown: false }}>
					<Tab.Screen name="Home" component={HomeStack} />
					<Tab.Screen name="Sessions" component={WorkoutSessionStack} />
					<Tab.Screen name="WorkoutPlans" component={WorkoutPlansStack} />
					<Tab.Screen name="Profile" component={ProfileStack} />
				</Tab.Navigator>
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	);
}
