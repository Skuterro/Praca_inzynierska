import { DayExercise } from "../../models/DayExercise";
import { WorkoutPlan } from "../../models/WorkoutPlan";
import { SimpleWorkoutPlanDay } from "../../models/SimpleWorkoutPlanDay";
import axiosClient from "../ApiClient";
import { WorkoutPlanDay } from "../../models/WorkoutPlanDay";

const WorkoutPlanService = {
	createWorkoutPlan: async (Name: string): Promise<WorkoutPlan> => {
		const { data } = await axiosClient.post("/workout-plans", { Name });
		return data;
	},

	addDayToPlan: async (PlanId: number, Name: string, WeekDay: string) => {
		const { data } = await axiosClient.post("/workout-plans/addDay", { PlanId, Name, WeekDay });
		return data;
	},

	addExerciseToDay: async (DayId: number, ExerciseId: number, Sets: number) => {
		const { data } = await axiosClient.post("/workout-plans/days/addExercise", { DayId, ExerciseId, Sets });
		return data;
	},

	getUserWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
		const { data } = await axiosClient.get("/workout-plans");
		return data;
	},

	getWorkoutPlanDays: async (planId: number): Promise<SimpleWorkoutPlanDay[]> => {
		const { data } = await axiosClient.get(`/workout-plans/${planId}/days`);
		return data;
	},

	getWorkoutPlanDayExercises: async (dayId: number): Promise<DayExercise[]> => {
		const { data } = await axiosClient.get(`/workout-plans/days/${dayId}/exercises`);
		return data;
	},

	getWorkoutByWeekDay: async (weekDayIndex: number): Promise<WorkoutPlanDay> => {
		const { data } = await axiosClient.get(`/workout-plans/weekDay/${weekDayIndex}`);
		return data;
	},

	toggleActive: async (planId: number): Promise<void> => {
		await axiosClient.put(`/workout-plans/${planId}/toggle-active`);
	},
};

export default WorkoutPlanService;
