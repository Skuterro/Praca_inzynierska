import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useMemo, useRef } from "react";
import { WorkoutSession } from "../../models/WorkoutSession";
import { Colors } from "../../constants/Colors";

interface ActivityGridProps {
	sessions: WorkoutSession[];
	endDate?: Date;
	rangeDays?: number;
}

const SQUARE_SIZE = 12;
const GAP_SIZE = 4;
const DAYS_IN_WEEK = 7;
const MONTH_LABEL_HEIGHT = 20;

const formatDateKey = (date: Date) => {
	return date.toISOString().split("T")[0];
};

export const ActivityGrid: React.FC<ActivityGridProps> = ({ sessions, endDate = new Date(), rangeDays = 365 }) => {
	const scrollViewRef = useRef<ScrollView>(null);

	const activityMap = useMemo(() => {
		const map = new Set<string>();
		sessions.forEach((session) => {
			if (session.start) {
				const dateObj = new Date(session.start);
				map.add(formatDateKey(dateObj));
			}
		});
		return map;
	}, [sessions]);

	const weeks = useMemo(() => {
		const weeksArray = [];
		let currentWeek = [];

		const startDate = new Date(endDate);
		startDate.setDate(startDate.getDate() - rangeDays);

		const dayOfWeek = startDate.getDay();
		startDate.setDate(startDate.getDate() - dayOfWeek);

		const totalDays = rangeDays + dayOfWeek;

		for (let i = 0; i <= totalDays; i++) {
			const d = new Date(startDate);
			d.setDate(d.getDate() + i);
			currentWeek.push(d);

			if (currentWeek.length === DAYS_IN_WEEK) {
				weeksArray.push(currentWeek);
				currentWeek = [];
			}
		}
		if (currentWeek.length > 0) weeksArray.push(currentWeek);

		return weeksArray;
	}, [endDate, rangeDays]);

	const renderMonthLabels = () => {
		return (
			<View style={styles.monthRow}>
				{weeks.map((week, index) => {
					const firstDayOfWeek = week[0];
					const prevWeekFirstDay = index > 0 ? weeks[index - 1][0] : null;

					const isNewMonth = prevWeekFirstDay
						? firstDayOfWeek.getMonth() !== prevWeekFirstDay.getMonth()
						: true;

					return (
						<View key={`month-${index}`} style={{ width: SQUARE_SIZE + GAP_SIZE, overflow: "visible" }}>
							{isNewMonth && (
								<Text style={styles.monthLabel} numberOfLines={1}>
									{firstDayOfWeek.toLocaleString("default", { month: "short" })}
								</Text>
							)}
						</View>
					);
				})}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.staticColumn}>
				<View style={styles.monthLabelSpacer} />
				<View style={styles.dayLabelsContainer}>
					<Text style={styles.dayLabel}> </Text>
					<Text style={styles.dayLabel}>Mon</Text>
					<Text style={styles.dayLabel}> </Text>
					<Text style={styles.dayLabel}>Wed</Text>
					<Text style={styles.dayLabel}> </Text>
					<Text style={styles.dayLabel}>Fri</Text>
					<Text style={styles.dayLabel}> </Text>
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				ref={scrollViewRef}
				onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
			>
				<View>
					{renderMonthLabels()}

					<View style={styles.gridContainer}>
						{weeks.map((week, wIndex) => (
							<View key={wIndex} style={styles.weekColumn}>
								{week.map((day) => {
									const dateKey = formatDateKey(day);
									const isActive = activityMap.has(dateKey);
									return (
										<View
											key={dateKey}
											style={[styles.cell, isActive ? styles.cellActive : styles.cellInactive]}
										/>
									);
								})}
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
		marginTop: 10,
		flexDirection: "row",
	},
	staticColumn: {
		marginRight: 8,
	},
	monthLabelSpacer: {
		height: MONTH_LABEL_HEIGHT,
		marginBottom: 8,
	},
	dayLabelsContainer: {
		justifyContent: "space-between",
		height: (SQUARE_SIZE + GAP_SIZE) * 7,
		paddingVertical: 0,
	},
	dayLabel: {
		color: "white",
		fontSize: 10,
		height: SQUARE_SIZE,
		lineHeight: SQUARE_SIZE,
		textAlign: "right",
	},
	monthRow: {
		flexDirection: "row",
		height: MONTH_LABEL_HEIGHT,
		marginBottom: 8,
	},
	monthLabel: {
		color: "white",
		fontSize: 10,
		width: 30,
	},
	gridContainer: {
		flexDirection: "row",
	},
	weekColumn: {
		flexDirection: "column",
		marginRight: GAP_SIZE,
	},
	cell: {
		width: SQUARE_SIZE,
		height: SQUARE_SIZE,
		marginBottom: GAP_SIZE,
		borderRadius: 3,
	},
	cellInactive: {
		backgroundColor: Colors.secondary,
	},
	cellActive: {
		backgroundColor: Colors.colorYellow,
	},
});
