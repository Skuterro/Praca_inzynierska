import { ActivityIndicator, Alert, FlatList, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useWorkoutSession } from "../../hooks/workoutSessionScreen/useWorkoutSession";
import { RouteProp } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import Header from "../../components/Header/Header";
import ListHeader from "../../components/List/ListHeader";
import ExerciseSessionItem from "../../components/Exercise/ExerciseSessionItem";

type SessionScreenRouteProp = RouteProp<RootStackParamList, "WorkoutSession">;
type SessionScreenNavProp = NativeStackNavigationProp<RootStackParamList, "WorkoutSession">;

type Props = {
	route: SessionScreenRouteProp;
	navigation: SessionScreenNavProp;
};

export default function WorkoutSessionScreen({ route, navigation }: Props) {
	const { exercises, sessionId } = route.params;

	const { loading, isSaving, exerciseList, addSet, finishWorkout } = useWorkoutSession(sessionId, exercises);

	const handleFinishWorkout = () => {
		Alert.alert("Finish Workout", "Are you sure you want to finish?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Finish",
				onPress: async () => {
					await finishWorkout();
					navigation.popToTop();
				},
			},
		]);
	};

	if (loading) {
		return (
			<View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
				<ActivityIndicator size="large" color={Colors.secondary} />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Header title="Workout session" onButtonClick={() => navigation.goBack()} />
			<View style={styles.contentWrapper}>
				<ListHeader buttonTitle="Finish workout" onButtonClick={handleFinishWorkout} />
				<FlatList
					data={exerciseList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ExerciseSessionItem exercise={item} onSave={addSet} />}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			{isSaving && <ActivityIndicator style={{ marginTop: 10 }} color="white" />}
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
});
