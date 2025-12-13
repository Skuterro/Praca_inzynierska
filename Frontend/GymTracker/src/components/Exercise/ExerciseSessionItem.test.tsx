import { render, screen, fireEvent } from "@testing-library/react-native";
import { ExerciseWithSets } from "../../models/ExerciseWithSets";
import ExerciseSessionItem from "./ExerciseSessionItem";

const mockExercise: ExerciseWithSets = {
	id: 1,
	name: "Bench Press",
	bodyPart: "Chest",
	sets: 3,
	existingSets: [
		{ setNumber: 1, reps: 10, weightKg: 80 },
		{ setNumber: 2, reps: 8, weightKg: 85 },
	],
};

const mockOnSave = jest.fn();

describe("ExerciseSessionItem", () => {
	test("renders ExerciseSessionItem with provided data", () => {
		render(<ExerciseSessionItem exercise={mockExercise} onSave={mockOnSave} />);

		expect(screen.getByText("Bench Press")).toBeOnTheScreen();
		expect(screen.getByText("3 sets")).toBeOnTheScreen();
	});

	test("expands sets list after user click", () => {
		render(<ExerciseSessionItem exercise={mockExercise} onSave={mockOnSave} />);

		expect(screen.queryByDisplayValue("10")).toBeNull();
		expect(screen.queryByDisplayValue("80")).toBeNull();
		expect(screen.queryByDisplayValue("8")).toBeNull();
		expect(screen.queryByDisplayValue("85")).toBeNull();

		fireEvent.press(screen.getByText("Bench Press"));

		expect(screen.getByDisplayValue("10")).toBeOnTheScreen();
		expect(screen.getByDisplayValue("80")).toBeOnTheScreen();
		expect(screen.getByDisplayValue("8")).toBeOnTheScreen();
		expect(screen.getByDisplayValue("85")).toBeOnTheScreen();
	});
});
