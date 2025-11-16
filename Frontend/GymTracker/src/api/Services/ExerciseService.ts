import { Exercise } from "../../models/Exercise";
import axiosClient from "../ApiClient";

const ExerciseService = {
	getExercises: async (): Promise<Exercise[]> => {
		const { data } = await axiosClient.get("/exercise");
		return data;
	},
};

export default ExerciseService;
