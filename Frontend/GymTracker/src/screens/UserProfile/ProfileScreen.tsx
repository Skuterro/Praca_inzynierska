import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { ExerciseRecordEnum } from "../../models/enums/ExerciseRecordEnum";
import { useUserProfile } from "../../hooks/profileScreen/useUserProfile";
import { ActivityGrid } from "../../components/UserProfile/ActivityGrid";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";
import LoadingDataContainer from "../../components/LoadingDataContainer";
import BodyMetricsContainer from "../../components/UserProfile/BodyMetricsContainer";
import PersonalRecordItem from "../../components/UserProfile/PersonalRecordItem";
import UserProfileHeader from "../../components/Header/UserProfileHeader";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileMain">;

type ProfileScreenProps = {
	navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
	const { user, logout } = useAuth();

	const { loading, bodyMetrics, personalRecords, sessions, saveBodyMetrics } = useUserProfile();

	const renderRecordsForExercise = (exercise: ExerciseRecordEnum, label: string) => {
		const recordsForExercise = personalRecords.filter((r) => r.exercise === exercise);

		if (recordsForExercise.length === 0) {
			return (
				<PersonalRecordItem
					key={exercise}
					value={undefined}
					label={label}
					onPress={() => navigation.navigate("PersonalRecords", { personalRecordExercise: exercise })}
				/>
			);
		}

		return recordsForExercise.map((record) => (
			<PersonalRecordItem
				key={record.id}
				value={record.weightKg}
				label={label}
				onPress={() => navigation.navigate("PersonalRecords", { personalRecordExercise: exercise })}
			/>
		));
	};

	if (loading) {
		return <LoadingDataContainer />;
	}

	return (
		<ScrollView style={styles.scrollContent}>
			<UserProfileHeader />
			<View style={AppStyles.contentWrapper}>
				<Text style={styles.email}>{user?.email}</Text>
				<BodyMetricsContainer bodyMetrics={bodyMetrics} onSave={saveBodyMetrics} />
				<View style={{ gap: 10, marginVertical: 10 }}>
					{renderRecordsForExercise(ExerciseRecordEnum.BenchPress, "Bench press")}
					{renderRecordsForExercise(ExerciseRecordEnum.Squat, "Squat")}
					{renderRecordsForExercise(ExerciseRecordEnum.DeadLift, "Deadlift")}
				</View>
				<ActivityGrid sessions={sessions} />
				<View style={styles.buttonRow}>
					<TouchableOpacity style={AppStyles.logoutButton} onPress={logout}>
						<Text style={[AppStyles.title, { color: Colors.colorBlack }]}>{constants.auth.logout}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 20,
		backgroundColor: Colors.primary,
	},
	email: {
		marginTop: -30,
		marginBottom: 20,
		fontSize: 16,
		color: Colors.subTitle,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 20,
	},
});
