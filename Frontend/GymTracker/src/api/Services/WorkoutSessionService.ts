import { SessionStatusResponse } from "../../models/SessionStatusResponse";
import { StartSessionResponse } from "../../models/StartSessionResponse";
import { WorkoutSession } from "../../models/WorkoutSession";
import axiosClient from "../ApiClient";

const WorkoutSessionService = {
	startWorkoutSession: async (WorkoutPlanDayId: number): Promise<StartSessionResponse> => {
		const { data } = await axiosClient.post("/workout-sessions/start", { WorkoutPlanDayId });
		return data;
	},

	finishWorkoutSession: async (SessionId: number): Promise<void> => {
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

	getTodayWorkoutSessionStatus: async (): Promise<SessionStatusResponse> => {
		const { data } = await axiosClient.get("/workout-sessions/today-status");
		return data;
	},

	getWorkoutSessionDetials: async (sessionId: number): Promise<WorkoutSession> => {
		const { data } = await axiosClient.get(`/workout-sessions/${sessionId}`);
		return data;
	},
};

export default WorkoutSessionService;
