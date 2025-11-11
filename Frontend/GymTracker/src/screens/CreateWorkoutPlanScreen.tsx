import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Colors } from "../constants/Colors";
import Header from "../components/Header/Header";

type CreateWorkoutPlanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CreateWorkoutPlan">;

type CreateWorkoutPlanScreenProps = {
	navigation: CreateWorkoutPlanScreenNavigationProp;
};

export default function CreateWorkoutPlanScreen({ navigation }: CreateWorkoutPlanScreenProps) {
	return (
		<View style={styles.container}>
			<Header title="Create plan" onButtonClick={() => navigation.goBack()} />
			<View style={styles.contentWrapper}>
				<TextInput style={styles.input} placeholder="Plan title" placeholderTextColor="#888" />
				<TouchableOpacity style={styles.button} onPress={() => alert("Plan created!")}>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>
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
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		borderRadius: 8,
		padding: 12,
		color: "white",
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#ffc107",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "black",
		fontWeight: "bold",
		fontSize: 16,
	},
});
