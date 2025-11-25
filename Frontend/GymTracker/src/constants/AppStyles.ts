import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

//<View style={[GlobalStyles.container, { backgroundColor: "white" }]}>

export const AppStyles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: Colors.primary,
	},

	contentWrapper: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 10,
		marginBottom: 15,
	},

	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},

	subTitle: {
		fontSize: 12,
		color: Colors.subTitle,
	},
});
