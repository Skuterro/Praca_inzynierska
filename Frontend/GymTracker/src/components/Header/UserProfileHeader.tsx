import { View, Text, Image, StyleSheet } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/Colors";
import React from "react";

export default function UserProfileHeader() {
	const { user } = useAuth();

	return (
		<View style={AppStyles.screenHeader}>
			<Text style={styles.nicknameText}>{user?.name}</Text>
			<Image source={require("../../../assets/logo.png")} style={styles.profileImage} />
		</View>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		width: 100,
		height: 100,
		marginRight: -15,
		marginTop: 10,
	},
	nicknameText: {
		fontSize: 30,
		fontWeight: "bold",
		color: Colors.colorWhite,
	},
});
