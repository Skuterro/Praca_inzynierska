import { render, screen } from "@testing-library/react-native";
import { DayExercise } from "../../models/DayExercise";
import ExerciseItem from "./ExerciseItem";

const mockExercise: DayExercise = {
	id: 1,
	name: "Bench Press",
	bodyPart: "Chest",
	sets: 3,
	minReps: 8,
	maxReps: 12,
};

describe("ExerciseItem", () => {
	test("renders exercise and body part names and sets with reps", () => {
		render(<ExerciseItem exercise={mockExercise} />);

		expect(screen.getByText("Bench Press")).toBeOnTheScreen();
		expect(screen.getByText("Chest")).toBeOnTheScreen();
		expect(screen.getByText("3 Sets • 8-12 reps")).toBeOnTheScreen();
	});

	test("renders sets and rep range when provided", () => {
		render(<ExerciseItem exercise={{ ...mockExercise, minReps: 8, maxReps: 12 }} />);

		expect(screen.getByText("3 Sets • 8-12 reps")).toBeOnTheScreen();
	});

	test("renders fixed reps when minReps equals maxReps", () => {
		render(<ExerciseItem exercise={{ ...mockExercise, minReps: 10, maxReps: 10 }} />);

		expect(screen.getByText("3 Sets • 10 reps")).toBeOnTheScreen();
	});
});
