import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import Navbar from "../components/Navbar/Navbar";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WorkoutPlansScreen from "../screens/WorkoutPlan/WorkoutPlansScreen";
import CreateWorkoutPlanScreen from "../screens/WorkoutPlan/CreateWorkoutPlanScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

export type RootStackParamList = {
	HomeMain: undefined;
	WorkoutPlansMain: undefined;
	CreateWorkoutPlan: undefined;
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={HomeScreen} />
		</Stack.Navigator>
	);
}

function WorkoutPlansStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="WorkoutPlansMain" component={WorkoutPlansScreen} />
			<Stack.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlanScreen} />
		</Stack.Navigator>
	);
}

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

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
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
