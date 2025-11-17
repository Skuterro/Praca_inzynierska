import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function ListEmptyComponent() {
	return (
		<View style={styles.container}>
			<LottieView autoPlay loop style={styles.animation} source={require("../../assets/emptyGhost.json")} />
			<Text style={styles.text}>Oops! There’s nothing to see here…</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	animation: {
		width: 150,
		height: 150,
	},
	text: {
		color: "white",
		fontSize: 14,
	},
});
