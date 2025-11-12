import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Colors } from "../../constants/Colors";
import { PlanItem } from "../../components/WorkoutPlan/PlanItem";
import { WorkoutPlan } from "../../models/WorkoutPlan";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import ListHeader from "../../components/ListHeader";

type WorkoutPlansScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlansMain">;

type WorkoutPlansScreenProps = {
	navigation: WorkoutPlansScreenNavigationProp;
};

const WORKOUT_PLANS: WorkoutPlan[] = [
	// Użycie interfejsu WorkoutPlan
	{ id: "1", title: "Plan Cardio", exercises: 15, isActive: true },
	{ id: "2", title: "Plan #2", exercises: 15, isActive: false },
	{ id: "3", title: "Plan #3", exercises: 15, isActive: false },
	{ id: "4", title: "Plan #4", exercises: 15, isActive: false },
	{ id: "5", title: "Plan #5", exercises: 15, isActive: false },
	{ id: "6", title: "Plan #6", exercises: 15, isActive: false },
	{ id: "7", title: "Plan #7", exercises: 15, isActive: false },
	{ id: "8", title: "Plan #8", exercises: 15, isActive: false },
	{ id: "9", title: "Plan #9", exercises: 15, isActive: false },
	{ id: "10", title: "Plan #10", exercises: 15, isActive: false },
];

export default function WorkoutPlansScreen({ navigation }: WorkoutPlansScreenProps) {
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
					data={WORKOUT_PLANS}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <PlanItem plan={item} onPress={() => undefined} />}
					showsVerticalScrollIndicator={false}
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
		backgroundColor: "#ffc107",
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
