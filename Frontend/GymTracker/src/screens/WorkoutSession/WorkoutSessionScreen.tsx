import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { WorkoutSession } from "../../models/WorkoutSession";
import { SessionItem } from "../../components/FlatListItem/SessionItem";
import { RouteProp } from "@react-navigation/native";
import { AppStyles } from "../../constants/AppStyles";
import WorkoutSessionService from "../../api/Services/WorkoutSessionService";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import UserProfileHeader from "../../components/Header/UserProfileHeader";

type WorkoutSessionScreenRouteProp = RouteProp<RootStackParamList, "WorkoutSessions">;
type WorkoutSessionsScreenNavProp = NativeStackNavigationProp<RootStackParamList, "WorkoutSessions">;

interface WorkoutSessionScreenProps {
	route: WorkoutSessionScreenRouteProp;
	navigation: WorkoutSessionsScreenNavProp;
}

export default function WorkoutSessionScreen({}: WorkoutSessionScreenProps) {
	const [sessions, setSessions] = useState<WorkoutSession[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchWorkoutSessions = async () => {
		try {
			setLoading(true);

			const data = await WorkoutSessionService.getAllUserSessions();
			setSessions(data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWorkoutSessions();
	}, []);

	return (
		<View style={AppStyles.mainContainer}>
			<UserProfileHeader />
			<View style={AppStyles.contentWrapper}>
				<Text style={styles.title}>Your sessions</Text>
				{loading ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<FlatList
						data={sessions}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <SessionItem session={item} onPress={() => {}} />}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<ListEmptyComponent />}
					/>
				)}
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
