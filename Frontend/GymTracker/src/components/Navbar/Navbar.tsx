import React from "react";
import { View, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NavItem } from "./NavItem";

export default function Navbar({ state, navigation }: BottomTabBarProps) {
	return (
		<View style={styles.navContainer}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return <NavItem key={route.key} route={route} isFocused={isFocused} onPress={onPress} />;
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	navContainer: {
		flexDirection: "row",
		backgroundColor: "#1C1C1E",
		height: 90,
		paddingBottom: 30,
		paddingTop: 10,
		paddingHorizontal: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: "space-around",
		marginTop: -18,
	},
});
