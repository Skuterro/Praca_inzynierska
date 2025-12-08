import { ActivityIndicator, View } from "react-native";
import { AppStyles } from "../constants/AppStyles";
import { Colors } from "../constants/Colors";

export default function LoadingDataContainer() {
	return (
		<View style={AppStyles.loadingData}>
			<ActivityIndicator size="large" color={Colors.secondary} />
		</View>
	);
}
