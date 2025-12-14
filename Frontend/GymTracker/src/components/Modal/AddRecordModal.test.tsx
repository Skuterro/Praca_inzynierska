import { fireEvent, render, screen } from "@testing-library/react-native";
import AddRecordModal from "./AddRecordModal";

const mockOnCancel = jest.fn();
const mockOnSave = jest.fn();

const props = {
	visible: true,
	onCancel: mockOnCancel,
	onSave: mockOnSave,
};

describe("AddRecordModal", () => {
	test("renders AddRecordModal", () => {
		render(<AddRecordModal {...props} />);

		expect(screen.getByText("Add New Record")).toBeOnTheScreen();
		expect(screen.getByText(/Weight\s+\(kg\)/i)).toBeOnTheScreen();
		expect(screen.getByText("Cancel")).toBeOnTheScreen();
		expect(screen.getByText("Save")).toBeOnTheScreen();
	});

	test("cancel button click should call onCancel function", () => {
		render(<AddRecordModal {...props} />);

		fireEvent.press(screen.getByText("Cancel"));

		expect(mockOnCancel).toHaveBeenCalledTimes(1);
	});

	test("save button click should call onSave function", () => {
		render(<AddRecordModal {...props} />);

		fireEvent.changeText(screen.getByPlaceholderText("0"), "85.5");
		fireEvent.press(screen.getByText("Save"));

		expect(mockOnSave).toHaveBeenCalledTimes(1);
		expect(mockOnSave).toHaveBeenCalledWith(85.5);
	});
});
