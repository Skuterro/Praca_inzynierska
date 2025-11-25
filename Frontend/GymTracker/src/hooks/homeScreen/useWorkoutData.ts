import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { DayExercise } from "../../models/DayExercise";
import { SessionStatusResponse } from "../../models/SessionStatusResponse";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import WorkoutSessionService from "../../api/Services/WorkoutSessionService";

interface UseWorkoutDataProps {
	selectedDay: number;
	monthIndex: number;
	isToday: boolean;
}

export function useWorkoutData({ selectedDay, monthIndex, isToday }: UseWorkoutDataProps) {
	const today = new Date();

	const [loading, setLoading] = useState<boolean>(false);
	const [selectedDayExercises, setSelectedDayExercises] = useState<DayExercise[]>([]);
	const [workoutDayId, setWorkoutDayId] = useState<number | undefined>();
	const [sessionStatus, setSessionStatus] = useState<SessionStatusResponse | null>(null);

	const fetchSelectedDayExercises = async () => {
		setLoading(true);
		try {
			const selectedDate = new Date(today.getFullYear(), monthIndex, selectedDay);
			const jsDay = selectedDate.getDay();
			const weekDay = jsDay === 0 ? 7 : jsDay;

			const data = await WorkoutPlanService.getWorkoutByWeekDay(weekDay);
			setWorkoutDayId(Number(data.id));
			setSelectedDayExercises(data.dayExercises ?? []);
		} finally {
			setLoading(false);
		}
	};

	const fetchSessionStatus = async () => {
		const status = await WorkoutSessionService.getTodayWorkoutSessionStatus();
		setSessionStatus(status);
	};

	useFocusEffect(
		useCallback(() => {
			fetchSelectedDayExercises();
			if (isToday) {
				fetchSessionStatus();
			} else {
				setSessionStatus(null);
			}
		}, [selectedDay, monthIndex, isToday])
	);

	return {
		loading,
		selectedDayExercises,
		workoutDayId,
		sessionStatus,
	};
}
