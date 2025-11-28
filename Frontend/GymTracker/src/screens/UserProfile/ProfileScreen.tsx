import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import BodyMetricsItem from "../../components/UserProfile/BodyMetricsItem";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileMain">;

type ProfileScreenProps = {
	navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		logout();
	};

	const handleUpdateMetrics = async () => {};

	return (
		<View style={styles.container}>
			<UserProfileHeader />
			<View style={styles.contentWrapper}>
				<Text style={styles.email}>{user?.email}</Text>
				<View style={styles.bodyMetricsContainer}>
					<BodyMetricsItem icon="body-outline" value="180 cm" label="height" />
					<BodyMetricsItem icon="barbell-outline" value="80 kg" label="weight" />
					<BodyMetricsItem icon="fitness-outline" value="10%" label="body fat" />
				</View>
				<Text style={styles.borderBottom}></Text>
				<View style={styles.bodyMetricsContainer}>
					<BodyMetricsItem icon="star-outline" value="120 kg" label="bench press" />
					<BodyMetricsItem icon="star-outline" value="160 kg" label="squat" />
					<BodyMetricsItem icon="star-outline" value="200 kg" label="deadlift" />
				</View>
				<View style={styles.buttonRow}>
					<TouchableOpacity style={styles.button} onPress={handleUpdateMetrics}>
						<Text style={styles.logoutText}>Update</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={handleLogout}>
						<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	contentWrapper: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 10,
		marginBottom: 15,
	},
	borderBottom: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.subTitle,
		marginBottom: 10,
	},
	bodyMetricsContainer: {
		gap: 10,
		marginVertical: 10,
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
		marginTop: -30,
		marginBottom: 20,
		fontSize: 16,
		color: "#ccc",
	},
	button: {
		backgroundColor: Colors.color1,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8,
	},
	logoutText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
	},
	buttonRow: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		bottom: 20,
		left: 20,
		right: 20,
	},
});
