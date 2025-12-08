import { View, Text } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import LottieView from "lottie-react-native";

export default function ListEmptyComponent() {
	return (
		<View style={{ alignItems: "center" }}>
			<LottieView
				autoPlay
				loop
				style={{ width: 150, height: 150 }}
				source={require("../../../assets/emptyGhost.json")}
			/>
			<Text style={AppStyles.title}>{constants.emptyList}</Text>
		</View>
	);
}
