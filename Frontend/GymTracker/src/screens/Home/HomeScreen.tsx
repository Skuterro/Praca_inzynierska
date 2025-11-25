import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useWorkoutButton } from "../../hooks/homeScreen/useWorkoutButton";
import { CalendarSection } from "../../components/Home/CalendarSection";
import { useWorkoutData } from "../../hooks/homeScreen/useWorkoutData";
import { ExerciseItem } from "../../components/Exercise/ExerciseItem";
import { AppStyles } from "../../constants/AppStyles";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import ListHeader from "../../components/List/ListHeader";
import React from "react";
import { WorkoutContent } from "../../components/Home/WorkoutContent";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeMain">;

type HomeScreenProps = {
	navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
	const today = new Date();
	const [monthIndex, setMonthIndex] = useState(today.getMonth());
	const [selectedDay, setSelectedDay] = useState(today.getDate());
	const isToday = selectedDay === today.getDate() && monthIndex === today.getMonth();

	const { loading, selectedDayExercises, workoutDayId, sessionStatus } = useWorkoutData({
		selectedDay,
		monthIndex,
		isToday,
	});

	const { getButtonLabel, isButtonDisabled, handleMainButton } = useWorkoutButton({
		sessionStatus,
		isToday,
		selectedDayExercises,
		workoutDayId,
		navigation,
	});

	return (
		<View style={AppStyles.mainContainer}>
			<UserProfileHeader />
			<CalendarSection
				today={today}
				monthIndex={monthIndex}
				selectedDay={selectedDay}
				setMonthIndex={setMonthIndex}
				setSelectedDay={setSelectedDay}
			/>
			<View style={AppStyles.contentWrapper}>
				<Text style={styles.borderBottom}></Text>
				<ListHeader
					title="Today's workout"
					buttonTitle={getButtonLabel()}
					disabled={isButtonDisabled}
					onButtonClick={handleMainButton}
				/>

				<WorkoutContent loading={loading} exercises={selectedDayExercises} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	borderBottom: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.secondary,
		marginBottom: 10,
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
		backgroundColor: Colors.color1,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	addButtonText: {
		color: "black",
		fontWeight: "600",
		fontSize: 14,
	},
});
