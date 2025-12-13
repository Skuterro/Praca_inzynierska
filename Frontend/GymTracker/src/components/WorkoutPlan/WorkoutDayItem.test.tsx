import { render, screen } from "@testing-library/react-native";
import { WorkoutDayItem } from "./WorkoutDayItem";

const props = {
	workoutDay: {
		id: 1,
		name: "WorkoutDayTestName",
		weekDay: "Monday",
	},
	onPress: jest.fn(),
};

describe("WorkoutDayItem", () => {
	test("renders WorkoutDayItem with provided data", () => {
		render(<WorkoutDayItem {...props} />);

		expect(screen.getByText("WorkoutDayTestName")).toBeOnTheScreen();
		expect(screen.getByText("Monday")).toBeOnTheScreen();
	});
});
