import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

//<View style={[GlobalStyles.container, { backgroundColor: "white" }]}>

export const AppStyles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: Colors.primary,
	},

	navbar: {
		flexDirection: "row",
		backgroundColor: Colors.colorDarkGray,
		height: 90,
		paddingBottom: 30,
		paddingTop: 10,
		paddingHorizontal: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: "space-around",
		marginTop: -18,
	},

	navItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		marginHorizontal: 4,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},

	paginationContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 16,
		gap: 16,
	},

	textInput: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		borderRadius: 8,
		padding: 12,
		color: Colors.colorWhite,
		marginBottom: 20,
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

	borderBottom: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.subTitle,
		marginBottom: 15,
	},

	loadingData: {
		flex: 1,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
	},

	itemLeftContent: {
		flexDirection: "column",
		alignItems: "flex-start",
		gap: 10,
	},

	flatListItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		borderRadius: 12,
		padding: 15,
		marginBottom: 12,
	},

	activeWorkoutPlanLabel: {
		color: Colors.colorGreen,
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 10,
	},

	screenHeader: {
		height: 90,
		backgroundColor: Colors.primary,
		marginTop: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},

	classicButton: {
		padding: 10,
		borderRadius: 8,
		backgroundColor: Colors.colorYellow,
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		justifyContent: "center",
		alignItems: "center",
	},

	modalContent: {
		width: "90%",
		backgroundColor: "#222",
		padding: 20,
		borderRadius: 10,
	},

	modalButton: {
		backgroundColor: Colors.colorYellow,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 6,
	},

	modalButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},

	modalButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBlack,
	},

	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.colorWhite,
		marginBottom: 20,
		textAlign: "center",
	},

	modalInput: {
		backgroundColor: Colors.secondary,
		color: Colors.colorWhite,
		padding: 10,
		borderRadius: 6,
		fontSize: 16,
	},

	logoImage: {
		width: 250,
		height: 250,
	},

	authContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: Colors.primary,
	},

	authInput: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		borderRadius: 8,
		padding: 12,
		color: Colors.colorWhite,
		marginBottom: 20,
		width: "100%",
	},

	authButton: {
		backgroundColor: Colors.colorYellow,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		width: "100%",
	},

	authLink: {
		color: Colors.colorYellow,
		textAlign: "center",
		marginTop: 15,
		fontWeight: "500",
	},

	logoutButton: {
		backgroundColor: Colors.colorYellow,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8,
	},
});
