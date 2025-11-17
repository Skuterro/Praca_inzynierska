import { Exercise } from "../../models/Exercise";
import axiosClient from "../ApiClient";

const ExerciseService = {
	getExercisesByBodyPart: async (bodyPart: string): Promise<Exercise[]> => {
		const { data } = await axiosClient.get(`/exercise/getByBodyPart/${bodyPart}`);
		return data;
	},
};

export default ExerciseService;
