import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

const DUMMY_USER_DATA = {
	nickname: "Kacperek",
	profilePicUrl: "https://picsum.photos/id/64/200/200",
};

export default function UserProfileHeader() {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.nicknameText}>{DUMMY_USER_DATA.nickname}</Text>
			<Image source={{ uri: DUMMY_USER_DATA.profilePicUrl }} style={styles.profileImage} />
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 15,
		paddingTop: 60,
		backgroundColor: Colors.primary,
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	nicknameText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "white",
	},
});
