import { View, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useState } from "react";
import { Colors } from "../constants/Colors";
import UserProfileHeader from "../components/UserProfieHeader/UserProfileHeader";
import MonthDropdown from "../components/Home/MonthDropdown";
import DayPicker from "../components/Home/DayPicker";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeMain">;

type HomeScreenProps = {
	navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
	const today = new Date();
	const [monthIndex, setMonthIndex] = useState(today.getMonth());
	const [selectedDay, setSelectedDay] = useState(today.getDate());

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
	},
	contentWrapper: {
		paddingHorizontal: 20,
		paddingTop: 5,
	},
});
