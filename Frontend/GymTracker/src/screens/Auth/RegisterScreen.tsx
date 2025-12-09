import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";
import LoadingDataContainer from "../../components/LoadingDataContainer";
import { KeyboardAvoidingView } from "react-native";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;

type RegisterScreenProps = {
	navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
	const { register } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [registering, setRegistering] = useState(false);

	const handleRegister = async () => {
		try {
			setRegistering(true);
			await register(username, email, password);
		} finally {
			setRegistering(false);
		}
	};

	if (registering) {
		return <LoadingDataContainer />;
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<View style={AppStyles.authContainer}>
				<Image source={require("../../../assets/logo.png")} style={AppStyles.logoImage} />
				<TextInput
					placeholder="Username"
					style={AppStyles.authInput}
					value={username}
					onChangeText={setUsername}
					placeholderTextColor={Colors.subTitle}
				/>
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
				<TouchableOpacity style={AppStyles.authButton} onPress={handleRegister}>
					<Text style={[AppStyles.title, { color: Colors.colorBlack }]}>{constants.auth.register}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={AppStyles.authLink}>{constants.auth.account}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
