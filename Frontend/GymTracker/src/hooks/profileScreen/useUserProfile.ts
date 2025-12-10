import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { PersonalRecord } from "../../models/PersonalRecord";
import { WorkoutSession } from "../../models/WorkoutSession";
import { BodyMetrics } from "../../models/BodyMetrics";
import WorkoutSessionService from "../../api/Services/WorkoutSessionService";
import UserProfileService from "../../api/Services/UserProfileService";

export function useUserProfile() {
	const [loading, setLoading] = useState(false);
	const [bodyMetrics, setBodyMetrics] = useState<BodyMetrics | null>(null);
	const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([]);
	const [sessions, setSessions] = useState<WorkoutSession[]>([]);

	const fetchBodyMetrics = async () => {
		try {
			setLoading(true);
			const data = await UserProfileService.getUserBodyMetrics();
			setBodyMetrics(data);
		} finally {
			setLoading(false);
		}
	};

	const fetchPersonalRecords = async () => {
		try {
			setLoading(true);
			const data = await UserProfileService.getCurrentUserPersonalRecords();
			setPersonalRecords(data);
		} finally {
			setLoading(false);
		}
	};

	const fetchWorkoutSessions = async () => {
		try {
			setLoading(true);
			const data = await WorkoutSessionService.getAllUserSessions(1, 366);
			setSessions(data.items);
		} finally {
			setLoading(false);
		}
	};

	const saveBodyMetrics = async (metrics: Partial<BodyMetrics>) => {
		try {
			setLoading(true);

			if (bodyMetrics) {
				const updated = await UserProfileService.updateUserBodyMetrics(
					bodyMetrics.id,
					metrics.weightKg ?? bodyMetrics.weightKg,
					metrics.heightCm ?? bodyMetrics.heightCm,
					metrics.bodyFatPercent ?? bodyMetrics.bodyFatPercent
				);
				setBodyMetrics(updated);
			} else {
				const created = await UserProfileService.createUserBodyMetrics(
					metrics.weightKg ?? 0,
					metrics.heightCm ?? 0,
					metrics.bodyFatPercent ?? 0
				);
				setBodyMetrics(created);
			}
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchBodyMetrics();
			fetchPersonalRecords();
			fetchWorkoutSessions();
		}, [])
	);

	return {
		loading,
		bodyMetrics,
		personalRecords,
		sessions,
		saveBodyMetrics,
	};
}
