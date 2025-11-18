import { View, Text, StyleSheet, Alert, TouchableOpacity, Switch, FlatList, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import Header from "../../components/Header/Header";
import { RouteProp } from "@react-navigation/native";
import ListHeader from "../../components/ListHeader";
import { WorkoutPlanDay } from "../../models/WorkoutPlanDay";
import { WorkoutDayItem } from "../../components/WorkoutPlan/WorkoutDayItem";
import ListEmptyComponent from "../../components/ListEmptyComponent";

type WorkoutPlanDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlanDetails">;
type WorkoutPlanDetailsScreenRouteProp = RouteProp<RootStackParamList, "WorkoutPlanDetails">;

type WorkoutPlanDetailsScreenProps = {
	navigation: WorkoutPlanDetailsScreenNavigationProp;
	route: WorkoutPlanDetailsScreenRouteProp;
};

export default function WorkoutPlanDetailsScreen({ navigation, route }: WorkoutPlanDetailsScreenProps) {
	const { planId, planName, isActive: initialIsActive } = route.params;
	const [workoutPlanDays, setWorkoutPlanDays] = useState<WorkoutPlanDay[]>([]);
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState<boolean>(initialIsActive);
	const [loadingActive, setLoadingActive] = useState(false);

	const handleAddDayNavigate = () => {
		navigation.navigate("CreateWorkoutPlanDay", {
			planId: planId,
			existingDays: workoutPlanDays.map((d) => d.weekDay),
		});
	};

	const handleToggleActive = async () => {
		try {
			setLoadingActive(true);
			await WorkoutPlanService.toggleActive(planId);
			setIsActive((prev) => !prev);
		} finally {
			setLoadingActive(false);
		}
	};

	const fetchDays = async () => {
		try {
			setLoading(true);
			const data = await WorkoutPlanService.getWorkoutPlanDays(planId);
			setWorkoutPlanDays(data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDays();
	}, []);

	if (loading) {
		return (
			<View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
				<ActivityIndicator size="large" color={Colors.secondary} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Header title={planName} onButtonClick={() => navigation.popTo("WorkoutPlansMain")} />
			<View style={styles.switchRow}>
				<Text style={styles.switchLabel}>Set plan as active</Text>
				<Switch
					value={isActive}
					onValueChange={handleToggleActive}
					thumbColor={isActive ? Colors.secondary : "#ccc"}
					trackColor={{ true: "#FFD76B", false: "#555" }}
					disabled={loadingActive}
				/>
			</View>
			<View style={styles.contentWrapper}>
				<ListHeader title="Training days" buttonTitle="Create new" onButtonClick={handleAddDayNavigate} />
				<FlatList
					data={workoutPlanDays}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<WorkoutDayItem
							workoutDay={item}
							onPress={() =>
								navigation.navigate("WorkoutPlanDayDetails", {
									dayId: Number(item.id),
									dayName: item.name,
									weekDay: item.weekDay,
								})
							}
						/>
					)}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
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
	switchRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginTop: 10,
	},
	switchLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
});
