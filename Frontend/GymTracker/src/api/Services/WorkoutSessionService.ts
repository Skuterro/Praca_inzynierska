import { WorkoutSession, WorkoutSessionDetails } from "../../models/WorkoutSession";
import { SessionStatusResponse } from "../../models/SessionStatusResponse";
import { StartSessionResponse } from "../../models/StartSessionResponse";
import axiosClient from "../ApiClient";
import { PagedResult } from "../../models/PagedResult";

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

	getWorkoutSessionDetials: async (sessionId: number): Promise<WorkoutSessionDetails> => {
		const { data } = await axiosClient.get(`/workout-sessions/${sessionId}`);
		return data;
	},

	getAllUserSessions: async (pageNumber: number, pageSize?: number): Promise<PagedResult<WorkoutSession>> => {
		const url = `/workout-sessions/?pageNumber=${pageNumber}` + (pageSize ? `&pageSize=${pageSize}` : "");

		const { data } = await axiosClient.get(url);
		return data;
	},
};

export default WorkoutSessionService;
