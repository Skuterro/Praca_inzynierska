import { render, screen } from "@testing-library/react-native";
import CalendarSection from "./CalendarSection";

const props = {
	today: new Date("2025-12-14T00:00:00.000Z"),
	monthIndex: 11,
	selectedDay: 14,
	setMonthIndex: jest.fn(),
	setSelectedDay: jest.fn(),
};

describe("CalendarSection", () => {
	test("render CalendarSection with proper selected month and days", () => {
		render(<CalendarSection {...props} />);

		expect(screen.getAllByText("December")).toHaveLength(2);
		const allDays = screen.queryAllByText(/^\d{1,2}$/);
		expect(allDays.length).toBe(31);
		expect(screen.getByText("31")).toBeOnTheScreen();
		expect(screen.queryByText("32")).not.toBeOnTheScreen();
	});
});
