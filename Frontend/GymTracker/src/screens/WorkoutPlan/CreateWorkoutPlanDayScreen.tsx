import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Colors } from "../../constants/Colors";
import { useRef, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { WeekDays } from "../../constants/WeekDays";
import WorkoutPlanService from "../../api/Services/WorkoutPlanService";
import Header from "../../components/Header/Header";

type CreateWorkoutPlanDayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CreateWorkoutPlanDay">;
type CreateWorkoutPlanDayScreenRouteProp = RouteProp<RootStackParamList, "CreateWorkoutPlanDay">;

type CreateWorkoutPlanDayScreenProps = {
	navigation: CreateWorkoutPlanDayScreenNavigationProp;
	route: CreateWorkoutPlanDayScreenRouteProp;
};

export default function CreateWorkoutPlanDayScreen({ navigation, route }: CreateWorkoutPlanDayScreenProps) {
	const { planId, existingDays } = route.params;
	const availableDays = WeekDays.filter((day) => !existingDays.includes(day));
	const [dayName, setDayName] = useState("");
	const [selectedWeekDay, setSelectedWeekDay] = useState("");
	const [loading, setLoading] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dropdownAnim = useRef(new Animated.Value(0)).current;

	const toggleDropdown = () => {
		const toValue = dropdownOpen ? 0 : availableDays.length * 44;
		Animated.timing(dropdownAnim, { toValue, duration: 200, useNativeDriver: false }).start();
		setDropdownOpen(!dropdownOpen);
	};

	const handleSelectWeekDay = (day: string) => {
		setSelectedWeekDay(day);
		toggleDropdown();
	};

	const handleCreateDay = async () => {
		console.log("s");
		if (!dayName.trim() || !selectedWeekDay) {
			Alert.alert("Validation", "Please enter a day name and select a weekday");
			return;
		}
		console.log("s");

		try {
			setLoading(true);
			const data = await WorkoutPlanService.addDayToPlan(planId, dayName, selectedWeekDay);
			console.log(data);
			navigation.goBack();
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Header title="Create training day" onButtonClick={() => navigation.goBack()} />
			<View style={styles.contentWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Day name"
					placeholderTextColor="#888"
					value={dayName}
					onChangeText={setDayName}
				/>
				<TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
					<Text style={styles.dropdownButtonText}>{selectedWeekDay || "Select day of the week ↓"}</Text>
				</TouchableOpacity>

				<Animated.View style={[styles.dropdownList, { height: dropdownAnim }]}>
					{availableDays.map((day) => (
						<TouchableOpacity
							key={day}
							onPress={() => handleSelectWeekDay(day)}
							style={styles.dropdownItem}
						>
							<Text style={[styles.dropdownItemText, selectedWeekDay === day && styles.selectedDay]}>
								{day}
							</Text>
						</TouchableOpacity>
					))}
				</Animated.View>

				<TouchableOpacity style={styles.button} onPress={handleCreateDay}>
					<Text style={styles.buttonText}>{loading ? "Creating..." : "Create"}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	contentWrapper: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 10,
		marginBottom: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		borderRadius: 8,
		padding: 12,
		color: "white",
		marginBottom: 20,
	},
	button: {
		backgroundColor: Colors.color1,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "black",
		fontWeight: "bold",
		fontSize: 16,
	},
	dropdownButton: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		borderRadius: 8,
		padding: 12,
		marginBottom: 10,
	},
	dropdownButtonText: {
		color: "white",
		fontSize: 16,
	},
	dropdownList: {
		backgroundColor: Colors.secondary,
		borderRadius: 8,
		marginBottom: 20,
	},
	dropdownItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary,
	},
	dropdownItemText: {
		color: "white",
		fontSize: 16,
	},
	selectedDay: {
		fontWeight: "bold",
	},
});
