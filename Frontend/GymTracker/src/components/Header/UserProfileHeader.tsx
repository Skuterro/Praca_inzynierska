import { View, Text, Image, StyleSheet } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { useAuth } from "../../context/AuthContext";
import React from "react";

const DUMMY_USER_DATA = {
	profilePicUrl: "https://picsum.photos/id/64/200/200",
};

export default function UserProfileHeader() {
	const { user } = useAuth();

	return (
		<View style={AppStyles.screenHeader}>
			<Text style={styles.nicknameText}>{user?.name}</Text>
			<Image source={{ uri: DUMMY_USER_DATA.profilePicUrl }} style={styles.profileImage} />
		</View>
	);
}

const styles = StyleSheet.create({
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
