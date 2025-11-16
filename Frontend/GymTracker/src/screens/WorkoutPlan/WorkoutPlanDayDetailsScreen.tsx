import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import Header from "../../components/Header/Header";

type WorkoutPlanDayDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "WorkoutPlanDayDetails">;
type WorkoutPlanDayDetailsScreenRouteProp = RouteProp<RootStackParamList, "WorkoutPlanDayDetails">;

type WorkoutPlanDayDetailsScreenProps = {
	navigation: WorkoutPlanDayDetailsScreenNavigationProp;
	route: WorkoutPlanDayDetailsScreenRouteProp;
};

export default function WorkoutPlanDayDetailsScreen({ navigation, route }: WorkoutPlanDayDetailsScreenProps) {
	const { dayId, dayName, weekDay } = route.params;

	return (
		<View style={styles.container}>
			<Header title={dayName} onButtonClick={() => navigation.goBack()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
});
