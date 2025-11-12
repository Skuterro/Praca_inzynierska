import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

interface LoginScreenProps {
	navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			await login(email, password);
		} catch (err) {
			alert("Login failed");
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Email"
				style={styles.input}
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				placeholderTextColor="#888"
			/>
			<TextInput
				placeholder="Password"
				style={styles.input}
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				placeholderTextColor="#888"
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Register")}>
				<Text style={styles.linkText}>Don't have an account? Register</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: Colors.primary },
	input: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		borderRadius: 8,
		padding: 12,
		color: "white",
		marginBottom: 20,
	},
	button: { backgroundColor: "#ffc107", padding: 12, borderRadius: 8, alignItems: "center" },
	buttonText: { color: "black", fontWeight: "bold", fontSize: 16 },
	linkText: { color: "#ffc107", textAlign: "center", marginTop: 15, fontWeight: "500" },
});
