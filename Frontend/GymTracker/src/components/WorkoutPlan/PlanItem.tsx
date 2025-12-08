import { TouchableOpacity, View, Text } from "react-native";
import { WorkoutPlan } from "../../models/WorkoutPlan";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import { Colors } from "../../constants/Colors";
import IonIcon from "react-native-vector-icons/Ionicons";

interface PlanItemProps {
	plan: WorkoutPlan;
	onPress: () => void;
}

export const PlanItem = ({ plan, onPress }: PlanItemProps) => (
	<TouchableOpacity style={AppStyles.flatListItem} onPress={onPress}>
		<View style={[AppStyles.itemLeftContent, { flexDirection: "row" }]}>
			<Text style={AppStyles.title}>{plan.name}</Text>
			{plan.isActive && <Text style={AppStyles.activeWorkoutPlanLabel}>{constants.workoutPlan.active}</Text>}
		</View>
		<IonIcon name="chevron-forward" size={24} color={Colors.subTitle} />
	</TouchableOpacity>
);
