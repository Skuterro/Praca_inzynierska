import { Stack } from "../AppNavigator";
import RegisterScreen from "../../screens/Auth/RegisterScreen";
import LoginScreen from "../../screens/Auth/LoginScreen";

export function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
	);
}
