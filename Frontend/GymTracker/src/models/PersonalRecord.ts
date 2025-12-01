import { ExerciseRecordEnum } from "./enums/ExerciseRecordEnum";

export interface PersonalRecord {
	id: number;
	exercise: ExerciseRecordEnum;
	weightKg: number;
	date: Date;
}
