import { Alert, FlatList, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useWorkoutSession } from "../../hooks/workoutSessionScreen/useWorkoutSession";
import { RouteProp } from "@react-navigation/native";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import LoadingDataContainer from "../../components/LoadingDataContainer";
import ExerciseSessionItem from "../../components/Exercise/ExerciseSessionItem";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import ListHeader from "../../components/Header/ListHeader";
import Header from "../../components/Header/Header";

type TrackSessionScreenRouteProp = RouteProp<RootStackParamList, "TrackWorkout">;
type TrackSessionScreenNavProp = NativeStackNavigationProp<RootStackParamList, "TrackWorkout">;

interface TrackWorkoutScreenProps {
	route: TrackSessionScreenRouteProp;
	navigation: TrackSessionScreenNavProp;
}

export default function TrackWorkoutScreen({ route, navigation }: TrackWorkoutScreenProps) {
	const { workoutPlanDayId, sessionId } = route.params;

	const { loading, finishing, isFinished, exerciseList, addSet, finishWorkout } = useWorkoutSession(
		sessionId,
		workoutPlanDayId
	);

	const handleFinishWorkout = () => {
		Alert.alert("Finish Workout", "Are you sure you want to finish?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Finish",
				onPress: async () => {
					await finishWorkout();
					navigation.pop();
				},
			},
		]);
	};

	if (loading || finishing) {
		return <LoadingDataContainer />;
	}

	return (
		<View style={AppStyles.mainContainer}>
			<Header title={constants.session.label} onButtonClick={() => navigation.pop()} />
			<View style={AppStyles.contentWrapper}>
				{!isFinished ? (
					<ListHeader buttonTitle={constants.session.finish} onButtonClick={handleFinishWorkout} />
				) : null}
				<FlatList
					data={exerciseList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <ExerciseSessionItem exercise={item} onSave={addSet} />}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</View>
		</View>
	);
}
