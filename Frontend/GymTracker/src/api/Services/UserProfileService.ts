import { BodyMetrics } from "../../models/BodyMetrics";
import { ExerciseRecordEnum } from "../../models/enums/ExerciseRecordEnum";
import { PagedResult } from "../../models/PagedResult";
import { PersonalRecord } from "../../models/PersonalRecord";
import axiosClient from "../ApiClient";

const UserProfileService = {
	getUserBodyMetrics: async (): Promise<BodyMetrics> => {
		const { data } = await axiosClient.get("/body-measurements");
		return data;
	},

	createUserBodyMetrics: async (WeightKg: number, HeightCm: number, BodyFatPercent: number): Promise<BodyMetrics> => {
		const { data } = await axiosClient.post("/body-measurements", { WeightKg, HeightCm, BodyFatPercent });
		return data;
	},

	updateUserBodyMetrics: async (
		BodyMeasurementsId: number,
		WeightKg: number,
		HeightCm: number,
		BodyFatPercent: number
	): Promise<BodyMetrics> => {
		const { data } = await axiosClient.patch("/body-measurements", {
			BodyMeasurementsId,
			WeightKg,
			HeightCm,
			BodyFatPercent,
		});
		return data;
	},

	getUserPersonalRecordsOfExercise: async (
		Exercise: ExerciseRecordEnum,
		pageNumber: number
	): Promise<PagedResult<PersonalRecord>> => {
		const { data } = await axiosClient.get(`/personal-records/exercise/${Exercise}?pageNumber=${pageNumber}`);
		return data;
	},

	getCurrentUserPersonalRecords: async (): Promise<PersonalRecord[]> => {
		const { data } = await axiosClient.get("/personal-records");
		return data;
	},

	createPersonalRecord: async (Exercise: ExerciseRecordEnum, WeightKg: number): Promise<void> => {
		await axiosClient.post("/personal-records", { Exercise, WeightKg });
	},

	deletePersonalRecord: async (recordId: number): Promise<void> => {
		await axiosClient.delete(`/personal-records/${recordId}`);
	},
};

export default UserProfileService;
