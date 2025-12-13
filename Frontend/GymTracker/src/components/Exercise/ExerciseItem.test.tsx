import { render, screen } from "@testing-library/react-native";
import { DayExercise } from "../../models/DayExercise";
import ExerciseItem from "./ExerciseItem";

const mockExercise: DayExercise = {
	id: 1,
	name: "Bench Press",
	bodyPart: "Chest",
	sets: 3,
};

describe("ExerciseItem", () => {
	test("renders exercise and body part names", () => {
		render(<ExerciseItem exercise={mockExercise} />);

		expect(screen.getByText("Bench Press")).toBeOnTheScreen();
		expect(screen.getByText("Chest")).toBeOnTheScreen();
		expect(screen.getByText("3 Sets")).toBeOnTheScreen();
	});
});
