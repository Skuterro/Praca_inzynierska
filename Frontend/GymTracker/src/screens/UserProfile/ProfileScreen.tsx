import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";

const DUMMY_USER_DATA = {
	profilePicUrl: "https://picsum.photos/id/64/200/200",
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileMain">;

type ProfileScreenProps = {
	navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		logout();
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: DUMMY_USER_DATA.profilePicUrl }} style={styles.profileImage} />
			<Text style={styles.nickname}>{user?.name}</Text>
			<Text style={styles.email}>{user?.email}</Text>

			<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 20,
		borderWidth: 2,
		borderColor: Colors.secondary,
	},
	nickname: {
		fontSize: 28,
		fontWeight: "bold",
		color: "white",
		marginBottom: 8,
	},
	email: {
		fontSize: 18,
		color: "#ccc",
		marginBottom: 30,
	},
	logoutButton: {
		backgroundColor: "#ffc107",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8,
	},
	logoutText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
	},
	infoText: {
		fontSize: 16,
		color: "white",
	},
});
