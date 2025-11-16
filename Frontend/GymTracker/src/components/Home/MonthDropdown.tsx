import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Months } from "../../constants/Months";

interface MonthDropdownProps {
	monthIndex: number;
	setMonthIndex: (index: number) => void;
}

export default function MonthDropdown({ monthIndex, setMonthIndex }: MonthDropdownProps) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownAnim = useRef(new Animated.Value(0)).current;

	const toggleDropdown = () => {
		const toValue = dropdownOpen ? 0 : Object.values(Months).length * 40;
		Animated.timing(dropdownAnim, { toValue, duration: 200, useNativeDriver: false }).start();
		setDropdownOpen(!dropdownOpen);
	};

	const selectMonth = (index: number) => {
		setMonthIndex(index);
		toggleDropdown();
	};

	const monthName = Object.values(Months)[monthIndex];

	return (
		<View style={styles.contentWrapper}>
			<TouchableOpacity onPress={toggleDropdown}>
				<Text style={styles.monthText}>{monthName}</Text>
			</TouchableOpacity>
			<Animated.View style={[styles.dropdown, { height: dropdownAnim }]}>
				{Object.values(Months).map((name, index) => (
					<TouchableOpacity key={index} onPress={() => selectMonth(index)} style={styles.dropdownItem}>
						<Text style={[styles.dropdownItemText, index === monthIndex && { fontWeight: "bold" }]}>
							{name}
						</Text>
					</TouchableOpacity>
				))}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	monthText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		marginBottom: 20,
	},
	dropdown: {
		overflow: "hidden",
	},
	dropdownItem: {
		height: 40,
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	dropdownItemText: {
		color: "white",
		fontSize: 16,
	},
	contentWrapper: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
});
