import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DayExercise } from "../../models/DayExercise";
import { SessionStatusResponse } from "../../models/SessionStatusResponse";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { SessionStatusEnum } from "../../models/enums/SessionStatusEnum";
import WorkoutSessionService from "../../api/Services/WorkoutSessionService";

interface UseWorkoutButtonProps {
	sessionStatus: SessionStatusResponse | null;
	isToday: boolean;
	selectedDayExercises: DayExercise[];
	workoutDayId?: number;
	navigation: NativeStackNavigationProp<RootStackParamList, any>;
}

export function useWorkoutButton({
	sessionStatus,
	isToday,
	selectedDayExercises,
	workoutDayId,
	navigation,
}: UseWorkoutButtonProps) {
	const getButtonLabel = (): string => {
		if (!isToday || !sessionStatus) return "Start workout";

		switch (sessionStatus.status) {
			case SessionStatusEnum.StartWorkout:
				return "Start workout";
			case SessionStatusEnum.ContinueWorkout:
				return "Continue";
			case SessionStatusEnum.FinishedWorkout:
				return "Workout finished";
			default:
				return "Start workout";
		}
	};

	const isButtonDisabled =
		!isToday || selectedDayExercises.length === 0 || sessionStatus?.status === SessionStatusEnum.FinishedWorkout;

	const handleMainButton = async () => {
		if (!sessionStatus) return;

		switch (sessionStatus.status) {
			case SessionStatusEnum.StartWorkout:
				if (workoutDayId) {
					const response = await WorkoutSessionService.startWorkoutSession(workoutDayId);
					navigation.navigate("WorkoutSession", {
						exercises: selectedDayExercises,
						sessionId: response.sessionId,
					});
				}
				break;

			case SessionStatusEnum.ContinueWorkout:
				if (sessionStatus.sessionId) {
					navigation.navigate("WorkoutSession", {
						exercises: selectedDayExercises,
						sessionId: sessionStatus.sessionId,
					});
				}
				break;

			case SessionStatusEnum.FinishedWorkout:
				break;
		}
	};

	return {
		getButtonLabel,
		isButtonDisabled,
		handleMainButton,
	};
}
