import { render, screen } from "@testing-library/react-native";
import WorkoutContent from "./WorkoutContent";

const props = {
	loading: false,
	exercises: [
		{
			id: 1,
			name: "Bench press",
			bodyPart: "chest",
			sets: 3,
			minReps: 8,
			maxReps: 12,
		},
		{
			id: 2,
			name: "Squat",
			bodyPart: "legs",
			sets: 4,
			minReps: 10,
			maxReps: 10,
		},
	],
};

describe("WorkoutContent", () => {
	test("render WorkoutContent with provided data", () => {
		render(<WorkoutContent {...props} />);

		expect(screen.getByText("Bench press")).toBeOnTheScreen();
		expect(screen.getByText("chest")).toBeOnTheScreen();
		expect(screen.getByText(/3\s+Sets/)).toBeOnTheScreen();
		expect(screen.getByText("Squat")).toBeOnTheScreen();
		expect(screen.getByText("legs")).toBeOnTheScreen();
		expect(screen.getByText(/4\s+Sets/)).toBeOnTheScreen();
	});

	test("render LoadingDataContainer when loading is true", () => {
		render(<WorkoutContent {...props} loading={true} />);

		expect(screen.getByTestId("activity-indicator")).toBeOnTheScreen();
	});
});
