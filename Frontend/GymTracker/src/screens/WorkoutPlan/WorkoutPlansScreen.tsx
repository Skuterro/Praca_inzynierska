import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList } from "react-native";
import { WorkoutPlan } from "../../models/WorkoutPlan";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import { PlanItem } from "../../components/WorkoutPlan/PlanItem";
import { useState } from "react";
import LoadingDataContainer from "../../components/LoadingDataContainer";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import ListHeader from "../../components/Header/ListHeader";
import React from "react";

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
		return <LoadingDataContainer />;
	}

	return (
		<View style={AppStyles.mainContainer}>
			<UserProfileHeader />
			<View style={AppStyles.contentWrapper}>
				<ListHeader
					title={constants.workoutPlan.label}
					buttonTitle="Create new"
					onButtonClick={() => navigation.navigate("CreateWorkoutPlan")}
				/>
				<FlatList
					data={plans}
					keyExtractor={(item) => item.id.toString()}
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
