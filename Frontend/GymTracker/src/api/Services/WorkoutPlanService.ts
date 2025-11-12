import axiosClient from "../ApiClient";

const API_URL_BASE = "http://192.168.1.17:5199/";

export interface WorkoutPlanCreateDto {
	Name: string;
}

export async function createWorkoutPlan(Name: string) {
	return axiosClient.post("/api/workout-plans", { Name });
}
