import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Colors } from "../constants/Colors";
import UserProfileHeader from "../components/UserProfieHeader/UserProfileHeader";
import { PlanItem } from "../components/WorkoutPlan/PlanItem";
import { WorkoutPlan } from "../models/WorkoutPlan";

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
];

export default function WorkoutPlansScreen({ navigation }: WorkoutPlansScreenProps) {
	return (
		<View style={styles.container}>
			<UserProfileHeader />
			<View style={styles.contentWrapper}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Twoje plany treningowe</Text>
					<TouchableOpacity style={styles.addButton} onPress={() => {}}>
						<Text style={styles.addButtonText}>Dodaj plan</Text>
					</TouchableOpacity>
				</View>
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
		backgroundColor: Colors.secondary,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},

	addButtonText: {
		color: "white",
		fontWeight: "600",
		fontSize: 14,
	},
});
