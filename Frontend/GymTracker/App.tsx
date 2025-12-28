import { AuthProvider } from "./src/context/AuthContext";
import { StatusBar } from "react-native";
import { Colors } from "./src/constants/Colors";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";

export default function App() {
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
			<AuthProvider>
				<AppNavigator />
			</AuthProvider>
			<Toast />
		</>
	);
}
