import { View, Text, StyleSheet, Alert, Switch, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SimpleWorkoutPlanDay } from "../../models/SimpleWorkoutPlanDay";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { WorkoutDayItem } from "../../components/WorkoutPlan/WorkoutDayItem";
import { useFocusEffect } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import LoadingDataContainer from "../../components/LoadingData/LoadingDataContainer";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import ListHeader from "../../components/Header/ListHeader";
import Header from "../../components/Header/Header";
import React from "react";

type WorkoutPlanDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlanDetails">;
type WorkoutPlanDetailsScreenRouteProp = RouteProp<RootStackParamList, "WorkoutPlanDetails">;

type WorkoutPlanDetailsScreenProps = {
	navigation: WorkoutPlanDetailsScreenNavigationProp;
	route: WorkoutPlanDetailsScreenRouteProp;
};

export default function WorkoutPlanDetailsScreen({ navigation, route }: WorkoutPlanDetailsScreenProps) {
	const { planId, planName, isActive: initialIsActive } = route.params;
	const [workoutPlanDays, setWorkoutPlanDays] = useState<SimpleWorkoutPlanDay[]>([]);
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

	const handleDelete = async () => {
		Alert.alert("Delete workout plan", "Are you sure you want to delete this plan?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					try {
						setLoading(true);
						await WorkoutPlanService.deleteWorkoutPlan(planId);
						navigation.goBack();
					} finally {
						setLoading(false);
					}
				},
			},
		]);
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

	useFocusEffect(
		React.useCallback(() => {
			fetchDays();
		}, [])
	);

	if (loading) {
		return <LoadingDataContainer />;
	}

	return (
		<View style={AppStyles.mainContainer}>
			<Header
				title={planName}
				onButtonClick={() => navigation.popTo("WorkoutPlansMain")}
				onDelete={handleDelete}
			/>
			<View style={AppStyles.contentWrapper}>
				<View style={styles.switchRow}>
					<Text style={styles.switchLabel}>{constants.workoutPlan.setActive}</Text>
					<Switch
						value={isActive}
						onValueChange={handleToggleActive}
						thumbColor={isActive ? Colors.secondary : "#ccc"}
						trackColor={{ true: Colors.colorYellow, false: "#555" }}
						disabled={loadingActive}
					/>
				</View>
				<ListHeader title="Training days" buttonTitle="Create new" onButtonClick={handleAddDayNavigate} />
				<FlatList
					data={workoutPlanDays}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<WorkoutDayItem
							workoutDay={item}
							onPress={() =>
								navigation.navigate("WorkoutPlanDayDetails", {
									dayId: Number(item.id),
									dayName: item.name,
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
	switchRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	switchLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
});
