import DayPicker from "./DayPicker";
import MonthDropdown from "./MonthDropdown";

interface CalendarSectionProps {
	today: Date;
	monthIndex: number;
	selectedDay: number;
	setMonthIndex: (index: number) => void;
	setSelectedDay: (day: number) => void;
}

export function CalendarSection({
	today,
	monthIndex,
	setMonthIndex,
	selectedDay,
	setSelectedDay,
}: CalendarSectionProps) {
	return (
		<>
			<MonthDropdown monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
			<DayPicker
				today={today}
				monthIndex={monthIndex}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>
		</>
	);
}
