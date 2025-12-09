import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useWorkoutButton } from "../../hooks/homeScreen/useWorkoutButton";
import { useWorkoutData } from "../../hooks/homeScreen/useWorkoutData";
import { View, Text } from "react-native";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { useState } from "react";
import UserProfileHeader from "../../components/Header/UserProfileHeader";
import WorkoutContent from "../../components/Home/WorkoutContent";
import CalendarSection from "../../components/Home/CalendarSection";
import ListHeader from "../../components/Header/ListHeader";
import React from "react";

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
				<Text style={AppStyles.borderBottom}></Text>
				<ListHeader
					title={constants.todaysWorkout}
					buttonTitle={getButtonLabel()}
					disabled={isButtonDisabled}
					onButtonClick={handleMainButton}
				/>
				<WorkoutContent loading={loading} exercises={selectedDayExercises} />
			</View>
		</View>
	);
}
