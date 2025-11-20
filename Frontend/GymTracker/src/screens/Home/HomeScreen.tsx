import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useEffect, useState } from "react";
import { DayExercise } from "../../models/DayExercise";
import { ExerciseItem } from "../../components/ExerciseItem";
import { Colors } from "../../constants/Colors";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import MonthDropdown from "../../components/Home/MonthDropdown";
import DayPicker from "../../components/Home/DayPicker";
import ListHeader from "../../components/ListHeader";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeMain">;

type HomeScreenProps = {
	navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
	const today = new Date();
	const [monthIndex, setMonthIndex] = useState(today.getMonth());
	const [selectedDay, setSelectedDay] = useState(today.getDate());
	const [selectedDayExercises, setSelectedDayExercises] = useState<DayExercise[]>([]);
	const [loading, setLoading] = useState(false);

	const isToday = selectedDay === today.getDate() && monthIndex === today.getMonth();

	const fetchSelectedDayExercises = async () => {
		try {
			setLoading(true);
			const selectedDate = new Date(today.getFullYear(), monthIndex, selectedDay);
			let jsDay = selectedDate.getDay();
			const weekDay = jsDay === 0 ? 7 : jsDay;

			const data = await WorkoutPlanService.getWorkoutByWeekDay(weekDay);
			setSelectedDayExercises(data ?? []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSelectedDayExercises();
	}, [selectedDay, monthIndex]);

	return (
		<View style={styles.container}>
			<UserProfileHeader />
			<MonthDropdown monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
			<DayPicker
				today={today}
				monthIndex={monthIndex}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>
			<View style={styles.contentWrapper}>
				<Text style={styles.borderBottom}></Text>
				<ListHeader
					title="Today's workout"
					buttonTitle="Start session"
					disabled={!isToday || selectedDayExercises.length === 0}
				/>

				{loading ? (
					<ActivityIndicator size="small" color="white" />
				) : selectedDayExercises.length === 0 ? (
					<Text style={styles.restDayText}>Rest day — no workout today</Text>
				) : (
					<FlatList
						data={selectedDayExercises}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <ExerciseItem exercise={item} />}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	borderBottom: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.secondary,
		marginBottom: 10,
	},
	contentWrapper: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 10,
		marginBottom: 15,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	addButton: {
		backgroundColor: "#ffc107",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	addButtonText: {
		color: "black",
		fontWeight: "600",
		fontSize: 14,
	},
	restDayText: {
		textAlign: "center",
		marginTop: 40,
		fontSize: 16,
		color: "#999",
		fontWeight: "500",
	},
});
