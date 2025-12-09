import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import Header from "../../components/Header/Header";

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
			setLoading(true);
			const data = await WorkoutPlanService.createWorkoutPlan(planName);
			navigation.navigate("WorkoutPlanDetails", {
				planId: Number(data.id),
				planName: data.name,
				isActive: false,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={AppStyles.mainContainer}>
			<Header title={constants.workoutPlan.create} onButtonClick={() => navigation.goBack()} />
			<View style={AppStyles.contentWrapper}>
				<TextInput
					style={AppStyles.textInput}
					placeholder={constants.workoutPlan.name}
					placeholderTextColor={Colors.subTitle}
					value={planName}
					onChangeText={setPlanName}
				/>
				<TouchableOpacity style={styles.button} onPress={handleCreatePlan}>
					<Text style={[AppStyles.title, { color: Colors.colorBlack }]}>
						{loading ? "Creating..." : "Create"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.colorYellow,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
});
