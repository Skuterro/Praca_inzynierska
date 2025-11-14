import axiosClient from "../ApiClient";

const WorkoutPlanService = {
	createWorkoutPlan(Name: string): Promise<void> {
		return axiosClient.post("/api/workout-plans", { Name });
	},
};

export default WorkoutPlanService;
