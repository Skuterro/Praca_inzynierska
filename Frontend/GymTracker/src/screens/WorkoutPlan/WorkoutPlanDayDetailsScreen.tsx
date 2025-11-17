import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { DayExercise } from "../../models/DayExercise";
import { RouteProp } from "@react-navigation/native";
import { ExerciseItem } from "../../components/ExerciseItem";
import { Exercise } from "../../models/Exercise";
import { Colors } from "../../constants/Colors";
import Header from "../../components/Header/Header";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import ListHeader from "../../components/ListHeader";
import ExerciseService from "../../api/Services/ExerciseService";
import AddExerciseModal from "../../components/Modal/AddExerciseModal";
import ListEmptyComponent from "../../components/ListEmptyComponent";

type WorkoutPlanDayDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlanDayDetails">;
type WorkoutPlanDayDetailsScreenRouteProp = RouteProp<RootStackParamList, "WorkoutPlanDayDetails">;

type WorkoutPlanDayDetailsScreenProps = {
	navigation: WorkoutPlanDayDetailsScreenNavigationProp;
	route: WorkoutPlanDayDetailsScreenRouteProp;
};

export default function WorkoutPlanDayDetailsScreen({ navigation, route }: WorkoutPlanDayDetailsScreenProps) {
	const { dayId, dayName, weekDay } = route.params;
	const [dayExercises, setDayExercises] = useState<DayExercise[]>([]);
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
	const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
	const [exerciseLoading, setExerciseLoading] = useState(false);

	const BODY_PARTS = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Abs"];

	const fetchDayExercises = async () => {
		try {
			setLoading(true);

			const data = await WorkoutPlanService.getWorkoutPlanDayExercises(dayId);
			setDayExercises(data);
		} finally {
			setLoading(false);
		}
	};

	const fetchExercisesByBodyPart = async (bodyPart: string) => {
		try {
			setExerciseLoading(true);
			const data = await ExerciseService.getExercisesByBodyPart(bodyPart);
			setAvailableExercises(data);
		} finally {
			setExerciseLoading(false);
		}
	};

	const handleAddExercise = () => {
		setModalVisible(true);
	};

	useEffect(() => {
		fetchDayExercises();
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
			<Header title={dayName} onButtonClick={() => navigation.goBack()} />
			<View style={styles.contentWrapper}>
				<ListHeader title="Exercises in this plan" buttonTitle="Add more" onButtonClick={handleAddExercise} />
				<FlatList
					data={dayExercises}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ExerciseItem exercise={item} />}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</View>

			<AddExerciseModal
				bodyParts={BODY_PARTS}
				visible={modalVisible}
				selectedBodyPart={selectedBodyPart}
				loading={exerciseLoading}
				exercises={availableExercises}
				onSelectBodyPart={(bodyPart) => {
					setSelectedBodyPart(bodyPart);
					fetchExercisesByBodyPart(bodyPart);
				}}
				onClose={() => setModalVisible(false)}
				onAddExercise={async (exerciseId, sets) => {
					await WorkoutPlanService.addExerciseToDay(dayId, exerciseId, sets);
					setModalVisible(false);
					setSelectedBodyPart(null);
					fetchDayExercises();
				}}
			/>
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
});
