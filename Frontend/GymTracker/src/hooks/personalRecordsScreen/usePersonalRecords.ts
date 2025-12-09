import { useEffect, useState } from "react";
import { PersonalRecord } from "../../models/PersonalRecord";
import { Alert } from "react-native";
import UserProfileService from "../../api/Services/UserProfileService";

export function usePersonalRecords(personalRecordExercise: number) {
	const [loading, setLoading] = useState(false);
	const [records, setRecords] = useState<PersonalRecord[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchRecords = async (pageNumber = page) => {
		try {
			setLoading(true);
			const data = await UserProfileService.getUserPersonalRecordsOfExercise(personalRecordExercise, pageNumber);
			setRecords(data.items);
			setPage(data.pageNumber);
			setTotalPages(data.totalPages);
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
			fetchRecords(1);
		} finally {
			setLoading(false);
		}
	};

	const changePage = (direction: "prev" | "next") => {
		if (direction === "prev" && page > 1) {
			fetchRecords(page - 1);
		}
		if (direction === "next" && page < totalPages) {
			fetchRecords(page + 1);
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
		fetchRecords(1);
	}, []);

	return {
		records,
		loading,
		modalVisible,
		page,
		totalPages,
		getTitle,
		setModalVisible,
		handleAddRecord,
		handleDelete,
		changePage,
	};
}
