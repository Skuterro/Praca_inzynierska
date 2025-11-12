import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { createWorkoutPlan } from "../api/WorkoutPlanService";
import { Colors } from "../constants/Colors";
import { useState } from "react";
import Header from "../components/Header/Header";

type CreateWorkoutPlanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CreateWorkoutPlan">;

type CreateWorkoutPlanScreenProps = {
	navigation: CreateWorkoutPlanScreenNavigationProp;
};

export default function CreateWorkoutPlanScreen({ navigation }: CreateWorkoutPlanScreenProps) {
	const [planName, setPlanName] = useState("");
	const [loading, setLoading] = useState(false);

	const handleCreatePlan = async () => {
		if (!planName.trim()) {
			Alert.alert("Validation error", "Plan name is required");
			return;
		}
		try {
			await createWorkoutPlan(planName);
			Alert.alert("Success", "Workout plan created successfully!");
			navigation.goBack();
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Header title="Create plan" onButtonClick={() => navigation.goBack()} />
			<View style={styles.contentWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Plan name"
					placeholderTextColor="#888"
					value={planName}
					onChangeText={setPlanName}
				/>
				<TouchableOpacity style={styles.button} onPress={handleCreatePlan}>
					<Text style={styles.buttonText}>{loading ? "Creating..." : "Create"}</Text>
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
