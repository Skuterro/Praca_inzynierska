import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, FlatList, Alert } from "react-native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { DayExercise } from "../../models/DayExercise";
import { RouteProp } from "@react-navigation/native";
import { bodyParts } from "../../constants/BodyParts";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import { Exercise } from "../../models/Exercise";
import { useState } from "react";
import LoadingDataContainer from "../../components/LoadingData/LoadingDataContainer";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import AddExerciseModal from "../../components/Modal/AddExerciseModal";
import ExerciseService from "../../api/Services/ExerciseService";
import ExerciseItem from "../../components/Exercise/ExerciseItem";
import ListHeader from "../../components/Header/ListHeader";
import Header from "../../components/Header/Header";
import React from "react";

type WorkoutPlanDayDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlanDayDetails">;
type WorkoutPlanDayDetailsScreenRouteProp = RouteProp<RootStackParamList, "WorkoutPlanDayDetails">;

type WorkoutPlanDayDetailsScreenProps = {
	navigation: WorkoutPlanDayDetailsScreenNavigationProp;
	route: WorkoutPlanDayDetailsScreenRouteProp;
};

export default function WorkoutPlanDayDetailsScreen({ navigation, route }: WorkoutPlanDayDetailsScreenProps) {
	const { dayId, dayName } = route.params;
	const [dayExercises, setDayExercises] = useState<DayExercise[]>([]);
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
	const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
	const [exerciseLoading, setExerciseLoading] = useState(false);

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

	const handleDelete = async () => {
		Alert.alert(
			"Delete workout plan day",
			"Are you sure you want to delete this day?\nAll related workout logs will be lost.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							setLoading(true);
							await WorkoutPlanService.deleteWorkoutPlanDay(dayId);
							navigation.goBack();
						} finally {
							setLoading(false);
						}
					},
				},
			],
		);
	};
	const handleAddExercise = () => {
		setModalVisible(true);
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchDayExercises();
		}, []),
	);

	if (loading) {
		return <LoadingDataContainer />;
	}

	return (
		<View style={AppStyles.mainContainer}>
			<Header title={dayName} onButtonClick={() => navigation.goBack()} onDelete={handleDelete} />
			<View style={AppStyles.contentWrapper}>
				<ListHeader
					title={constants.workoutPlan.exercises}
					buttonTitle={constants.exercise.addMore}
					onButtonClick={handleAddExercise}
				/>
				<FlatList
					data={dayExercises}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <ExerciseItem exercise={item} />}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</View>

			<AddExerciseModal
				bodyParts={bodyParts}
				visible={modalVisible}
				selectedBodyPart={selectedBodyPart}
				loading={exerciseLoading}
				exercises={availableExercises}
				onSelectBodyPart={(bodyPart) => {
					setSelectedBodyPart(bodyPart);
					fetchExercisesByBodyPart(bodyPart);
				}}
				onClose={() => setModalVisible(false)}
				onAddExercise={async (exerciseId, sets, minReps, maxReps) => {
					await WorkoutPlanService.addExerciseToDay(dayId, exerciseId, sets, minReps, maxReps);
					setModalVisible(false);
					setSelectedBodyPart(null);
					fetchDayExercises();
				}}
			/>
		</View>
	);
}
