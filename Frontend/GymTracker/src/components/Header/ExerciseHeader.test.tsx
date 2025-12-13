import { render, screen } from "@testing-library/react-native";
import ExerciseHeader from "./ExerciseHeader";

const props = {
	name: "Squat",
	setsCount: 4,
	expanded: false,
	isFinished: false,
	onPress: jest.fn(),
};

describe("ExerciseHeader", () => {
	test("renders ExerciseHeader with provided data", () => {
		render(<ExerciseHeader {...props} />);

		expect(screen.getByText("Squat")).toBeOnTheScreen();
		expect(screen.getByText("4 sets")).toBeOnTheScreen();
	});
});
