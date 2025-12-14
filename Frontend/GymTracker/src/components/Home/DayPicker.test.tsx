import { render, screen } from "@testing-library/react-native";
import DayPicker from "./DayPicker";

const props = {
	today: new Date("2025-12-14T00:00:00.000Z"),
	monthIndex: 0,
	selectedDay: 1,
	setSelectedDay: jest.fn(),
};

describe("DayPicker", () => {
	test("renders 31 days for 31-day month - January", () => {
		render(<DayPicker {...props} />);

		const allDays = screen.queryAllByText(/^\d{1,2}$/);
		expect(allDays.length).toBe(31);
		expect(screen.getByText("31")).toBeOnTheScreen();
		expect(screen.queryByText("32")).not.toBeOnTheScreen();
	});

	test("renders 30 days for 30-day month - April", () => {
		render(<DayPicker {...props} monthIndex={3} />);

		const allDays = screen.queryAllByText(/^\d{1,2}$/);
		expect(allDays.length).toBe(30);
		expect(screen.getByText("30")).toBeOnTheScreen();
		expect(screen.queryByText("31")).not.toBeOnTheScreen();
	});

	test("renders 28 days February in Leap Year", () => {
		render(<DayPicker {...props} monthIndex={1} />);

		const allDays = screen.queryAllByText(/^\d{1,2}$/);
		expect(allDays.length).toBe(28);
		expect(screen.getByText("28")).toBeOnTheScreen();
		expect(screen.queryByText("29")).not.toBeOnTheScreen();
	});

	test("renders 29 days February in Common Year", () => {
		render(<DayPicker {...props} today={new Date("2024-12-14T00:00:00.000Z")} monthIndex={1} />);

		const allDays = screen.queryAllByText(/^\d{1,2}$/);
		expect(allDays.length).toBe(29);
		expect(screen.getByText("29")).toBeOnTheScreen();
		expect(screen.queryByText("30")).not.toBeOnTheScreen();
	});
});
