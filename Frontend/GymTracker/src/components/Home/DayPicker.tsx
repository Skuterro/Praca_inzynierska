import React, { useEffect, useRef, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";

interface DayPickerProps {
	today: Date;
	monthIndex: number;
	selectedDay: number;
	setSelectedDay: (day: number) => void;
}

export default function DayPicker({ today, monthIndex, selectedDay, setSelectedDay }: DayPickerProps) {
	const scrollRef = useRef<ScrollView>(null);
	const screenWidth = Dimensions.get("window").width;

	const days = useMemo(() => {
		const arr = [];
		const year = today.getFullYear();
		const lastDay = new Date(year, monthIndex + 1, 0).getDate();

		for (let i = 1; i <= lastDay; i++) {
			arr.push({ day: i, isToday: monthIndex === today.getMonth() && i === today.getDate() });
		}
		return arr;
	}, [monthIndex]);

	useEffect(() => {
		if (monthIndex !== today.getMonth()) return;
		const todayIndex = today.getDate() - 1;
		const circleWidth = 40;
		const circleMargin = 10;
		const padding = 20;

		const offset = todayIndex * (circleWidth + circleMargin * 2) + padding - screenWidth / 2 + circleWidth / 2;
		scrollRef.current?.scrollTo({ x: offset, animated: false });
	}, [monthIndex, screenWidth]);

	return (
		<View>
			<ScrollView
				ref={scrollRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.daysScroll}
			>
				{days.map((d, index) => {
					const isSelected = d.day === selectedDay;
					const isToday = d.isToday;
					return (
						<TouchableOpacity key={index} onPress={() => setSelectedDay(d.day)} activeOpacity={0.7}>
							<View
								style={[
									styles.dayCircle,
									isToday && styles.dayCircleToday,
									isToday && selectedDay !== today.getDate() && styles.dayCircleTodayOnlyBorder,
									isSelected && !isToday && styles.dayCircleSelected,
								]}
							>
								<Text
									style={[
										styles.dayText,
										isToday && styles.dayTextToday,
										isToday && selectedDay !== today.getDate() && styles.dayTextTodayBorder,
										isSelected && !isToday && styles.dayTextSelected,
									]}
								>
									{d.day}
								</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	daysScroll: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	dayCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.secondary,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 9.2,
	},
	dayCircleToday: {
		width: 55,
		height: 55,
		borderRadius: 27.5,
		backgroundColor: "#ffc107",
	},
	dayCircleTodayOnlyBorder: {
		width: 55,
		height: 55,
		borderRadius: 27.5,
		borderWidth: 2,
		borderColor: "#ffc107",
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
	},
	dayCircleSelected: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#ffc107",
		justifyContent: "center",
		alignItems: "center",
	},
	dayText: {
		color: "white",
		fontSize: 15,
		fontWeight: "500",
	},
	dayTextToday: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.primary,
	},
	dayTextTodayBorder: {
		color: "#ffc107",
		fontSize: 18,
		fontWeight: "bold",
	},
	dayTextSelected: {
		color: Colors.primary,
		fontSize: 15,
		fontWeight: "500",
	},
});
