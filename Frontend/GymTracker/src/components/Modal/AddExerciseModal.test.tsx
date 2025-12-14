import { fireEvent, render, screen } from "@testing-library/react-native";
import AddExerciseModal from "./AddExerciseModal";

const props = {
	bodyParts: ["chest", "legs"],
	visible: true,
	selectedBodyPart: null,
	loading: false,
	exercises: [{ id: 1, name: "Bench Press", bodyPart: "chest" }],
	onSelectBodyPart: jest.fn(),
	onClose: jest.fn(),
	onAddExercise: jest.fn(() => Promise.resolve()),
};

describe("AddExerciseModal", () => {
	test("render AddExerciseModal", () => {
		render(<AddExerciseModal {...props} />);

		expect(screen.getByText("Add exercise")).toBeOnTheScreen();
		expect(screen.getByText("Choose body part")).toBeOnTheScreen();
	});

	test("render AddExerciseModal with provided body parts", () => {
		render(<AddExerciseModal {...props} />);

		expect(screen.getByText("chest")).toBeOnTheScreen();
		expect(screen.getByText("legs")).toBeOnTheScreen();
	});

	test("body part click should call onSelectedBodyPart function with proper prop", () => {
		render(<AddExerciseModal {...props} />);

		fireEvent.press(screen.getByText("chest"));

		expect(props.onSelectBodyPart).toHaveBeenCalledWith("chest");
	});

	test("should render chest exercise when chest is selected", () => {
		render(<AddExerciseModal {...props} selectedBodyPart={"chest"} />);

		expect(screen.getByText("Bench Press")).toBeOnTheScreen();
	});
});
