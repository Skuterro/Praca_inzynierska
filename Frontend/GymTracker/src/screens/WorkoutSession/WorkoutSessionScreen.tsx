import { View, Text, StyleSheet, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { WorkoutSession } from "../../models/WorkoutSession";
import { useFocusEffect } from "@react-navigation/native";
import { AppStyles } from "../../constants/AppStyles";
import WorkoutSessionService from "../../api/Services/WorkoutSessionService";
import LoadingDataContainer from "../../components/LoadingData/LoadingDataContainer";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import SessionItem from "../../components/Session/SessionItem";
import Pagination from "../../components/Pagination/Pagination";

type WorkoutSessionsScreenNavProp = NativeStackNavigationProp<RootStackParamList, "WorkoutSessions">;

interface WorkoutSessionScreenProps {
	navigation: WorkoutSessionsScreenNavProp;
}

export default function WorkoutSessionScreen({ navigation }: WorkoutSessionScreenProps) {
	const [sessions, setSessions] = useState<WorkoutSession[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchWorkoutSessions = async (pageNumber = page) => {
		try {
			setLoading(true);

			const data = await WorkoutSessionService.getAllUserSessions(pageNumber);
			setSessions(data.items);
			setPage(data.pageNumber);
			setTotalPages(data.totalPages);
		} finally {
			setLoading(false);
		}
	};

	const changePage = (direction: "prev" | "next") => {
		if (direction === "prev" && page > 1) {
			fetchWorkoutSessions(page - 1);
		}
		if (direction === "next" && page < totalPages) {
			fetchWorkoutSessions(page + 1);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchWorkoutSessions();
		}, [])
	);

	if (loading) {
		return <LoadingDataContainer />;
	}

	return (
		<View style={AppStyles.mainContainer}>
			<UserProfileHeader />
			<View style={AppStyles.contentWrapper}>
				<Text style={styles.title}>Your sessions</Text>
				<FlatList
					data={sessions}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<SessionItem
							session={item}
							onPress={() =>
								navigation.navigate("TrackWorkout", {
									workoutPlanDayId: item.workoutPlanDayId,
									sessionId: item.id,
								})
							}
						/>
					)}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
				<Pagination
					page={page}
					totalPages={totalPages}
					onPrev={() => changePage("prev")}
					onNext={() => changePage("next")}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
		marginBottom: 15,
	},
});
