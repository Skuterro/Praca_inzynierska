import { render, screen } from "@testing-library/react-native";
import ExerciseSetRow from "./ExerciseSetRow";

const props = {
	index: 0,
	reps: "10",
	weight: "80",
	isSaved: false,
	isLoading: false,
	onChange: jest.fn(),
	onSave: jest.fn(),
};

describe("ExerciseSetRow", () => {
	test("renders ExerciseSetRow with provided data", () => {
		render(<ExerciseSetRow {...props} />);

		expect(screen.getByText("1")).toBeTruthy();
		expect(screen.getByDisplayValue("10")).toBeTruthy();
		expect(screen.getByDisplayValue("80")).toBeTruthy();
	});
});
