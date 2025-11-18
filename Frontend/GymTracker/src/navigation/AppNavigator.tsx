import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { WorkoutPlansStack } from "./BottomTabs/WorkoutPlanStack";
import { useAuth } from "../context/AuthContext";
import { HomeStack } from "./BottomTabs/HomeStack";
import { AuthStack } from "./BottomTabs/AuthStack";
import Navbar from "../components/Navbar/Navbar";
import ProfileScreen from "../screens/UserProfile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

export type RootStackParamList = {
	HomeMain: undefined;
	WorkoutPlansMain: undefined;
	WorkoutPlanDetails: { planId: number; planName: string; isActive: boolean };
	WorkoutPlanDayDetails: { dayId: number; dayName: string; weekDay: string };
	CreateWorkoutPlan: undefined;
	CreateWorkoutPlanDay: { planId: number; existingDays: string[] };
	ProfileMain: undefined;
	SettingsMain: undefined;
	Login: undefined;
	Register: undefined;
};

export type RootTabParamList = {
	Home: undefined;
	WorkoutPlans: undefined;
	Profile: undefined;
	Settings: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function ProfileStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileMain" component={ProfileScreen} />
		</Stack.Navigator>
	);
}

function SettingsStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SettingsMain" component={SettingsScreen} />
		</Stack.Navigator>
	);
}

export default function AppNavigator() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{user ? (
				<Tab.Navigator tabBar={(props) => <Navbar {...props} />} screenOptions={{ headerShown: false }}>
					<Tab.Screen name="Home" component={HomeStack} />
					<Tab.Screen name="WorkoutPlans" component={WorkoutPlansStack} />
					<Tab.Screen name="Profile" component={ProfileStack} />
					<Tab.Screen name="Settings" component={SettingsStack} />
				</Tab.Navigator>
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	);
}
