import { StartSessionResponse } from "../../models/StartSessionResponse";
import axiosClient from "../ApiClient";

const WorkoutSessionService = {
	startWorkoutSession: async (WorkoutPlanDayId: number): Promise<StartSessionResponse> => {
		const { data } = await axiosClient.post("/workout-sessions/start", { WorkoutPlanDayId });
		return data;
	},

	endWorkoutSession: async (SessionId: number): Promise<void> => {
		await axiosClient.post("/workout-sessions/finish", { SessionId });
	},

	addSet: async (
		WorkoutSessionId: number,
		DayExerciseId: number,
		SetNumber: number,
		Reps: number,
		WeightKg: number
	): Promise<void> => {
		await axiosClient.post("workout-sessions/add-set", {
			WorkoutSessionId,
			DayExerciseId,
			SetNumber,
			Reps,
			WeightKg,
		});
	},
};

export default WorkoutSessionService;
