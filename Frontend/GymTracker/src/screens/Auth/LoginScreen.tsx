import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";
import LoadingDataContainer from "../../components/LoadingData/LoadingDataContainer";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

interface LoginScreenProps {
	navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [logging, setLogging] = useState(false);

	const handleLogin = async () => {
		try {
			setLogging(true);
			await login(email, password);
		} finally {
			setLogging(false);
		}
	};

	if (logging) {
		return <LoadingDataContainer />;
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<View style={AppStyles.authContainer}>
				<Image source={require("../../../assets/logo.png")} style={AppStyles.logoImage} />
				<TextInput
					placeholder="Email"
					style={AppStyles.authInput}
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					placeholderTextColor={Colors.subTitle}
				/>
				<TextInput
					placeholder="Password"
					style={AppStyles.authInput}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					placeholderTextColor={Colors.subTitle}
				/>
				<TouchableOpacity style={AppStyles.authButton} onPress={handleLogin}>
					<Text style={[AppStyles.title, { color: Colors.colorBlack }]}>{constants.auth.login}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Register")}>
					<Text style={AppStyles.authLink}>{constants.auth.noAccount}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
