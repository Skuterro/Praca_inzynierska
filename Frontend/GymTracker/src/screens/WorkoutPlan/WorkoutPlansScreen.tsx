import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Colors } from "../../constants/Colors";
import { PlanItem } from "../../components/WorkoutPlan/PlanItem";
import { WorkoutPlan } from "../../models/WorkoutPlan";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import ListHeader from "../../components/List/ListHeader";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";

type WorkoutPlansScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlansMain">;

type WorkoutPlansScreenProps = {
	navigation: WorkoutPlansScreenNavigationProp;
};

export default function WorkoutPlansScreen({ navigation }: WorkoutPlansScreenProps) {
	const [plans, setPlans] = useState<WorkoutPlan[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPlans = async () => {
		try {
			setLoading(true);
			const data = await WorkoutPlanService.getUserWorkoutPlans();
			setPlans(data);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchPlans();
		}, [])
	);

	if (loading) {
		return (
			<View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
				<ActivityIndicator size="large" color={Colors.secondary} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<UserProfileHeader />
			<View style={styles.contentWrapper}>
				<ListHeader
					title="Your workout plans"
					buttonTitle="Create new"
					onButtonClick={() => navigation.navigate("CreateWorkoutPlan")}
				/>
				<FlatList
					data={plans}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<PlanItem
							plan={item}
							onPress={() =>
								navigation.navigate("WorkoutPlanDetails", {
									planId: Number(item.id),
									planName: item.name,
									isActive: item.isActive,
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
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	addButton: {
		backgroundColor: Colors.color1,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	addButtonText: {
		color: "black",
		fontWeight: "600",
		fontSize: 14,
	},
});
