import { render, screen } from "@testing-library/react-native";
import SessionItem from "./SessionItem";

const props = {
	session: {
		id: 1,
		workoutPlanDayName: "PullDay",
		workoutPlanDayId: 1,
		workoutPlanName: "TestPlan",
		isFinished: false,
		start: new Date("2025-06-15T10:00:00.000Z"),
	},
	onPress: jest.fn(),
};

describe("SessionItem", () => {
	test("renders SessionItem with provided unfinished session data", () => {
		render(<SessionItem {...props} />);

		expect(screen.getByText(/PullDay\s*\(\s*15-06-2025\s*\)/i)).toBeOnTheScreen();
		expect(screen.getByText("TestPlan")).toBeOnTheScreen();
		expect(screen.getByText("Unfinished")).toBeOnTheScreen();
	});

	test("renders SessionItem with provided finished session data", () => {
		props.session.isFinished = true;
		render(<SessionItem {...props} />);

		expect(screen.getByText("Finished")).toBeOnTheScreen();
	});
});
