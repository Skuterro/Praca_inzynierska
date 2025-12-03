import { useEffect, useState } from "react";
import { PersonalRecord } from "../../models/PersonalRecord";
import { Alert } from "react-native";
import UserProfileService from "../../api/Services/UserProfileService";

export function usePersonalRecords(personalRecordExercise: number) {
	const [loading, setLoading] = useState(false);
	const [records, setRecords] = useState<PersonalRecord[]>([]);
	const [modalVisible, setModalVisible] = useState(false);

	const fetchRecords = async () => {
		try {
			setLoading(true);
			const data = await UserProfileService.getUserPersonalRecordsOfExercise(personalRecordExercise);
			setRecords(data);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (recordId: number) => {
		Alert.alert("Delete your record", "Are you sure you want to delete this record?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					try {
						setLoading(true);
						await UserProfileService.deletePersonalRecord(recordId);
						fetchRecords();
					} finally {
						setLoading(false);
					}
				},
			},
		]);
	};

	const handleAddRecord = async (weightKg: number) => {
		try {
			setLoading(true);
			await UserProfileService.createPersonalRecord(personalRecordExercise, weightKg);
			setModalVisible(false);
			fetchRecords();
		} finally {
			setLoading(false);
		}
	};

	const getTitle = () => {
		switch (personalRecordExercise) {
			case 1:
				return "Bench press records";
			case 2:
				return "Squat records";
			case 3:
				return "Deadlift records";
			default:
				return "Records";
		}
	};

	useEffect(() => {
		fetchRecords();
	}, []);

	return {
		records,
		loading,
		modalVisible,
		getTitle,
		setModalVisible,
		fetchRecords,
		handleAddRecord,
		handleDelete,
	};
}
