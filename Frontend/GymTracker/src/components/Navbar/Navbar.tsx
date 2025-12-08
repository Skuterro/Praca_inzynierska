import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AppStyles } from "../../constants/AppStyles";
import { View } from "react-native";
import NavItem from "./NavItem";
import React from "react";

export default function Navbar({ state, navigation }: BottomTabBarProps) {
	return (
		<View style={AppStyles.navbar}>
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
