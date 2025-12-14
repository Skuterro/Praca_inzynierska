import { fireEvent, render, screen } from "@testing-library/react-native";
import BodyMetricsModal from "./BodyMetricsModal";

const mockOnCancel = jest.fn();
const mockOnSave = jest.fn();

const props = {
	visible: true,
	initialMetrics: {
		id: 1,
		weightKg: 90,
		heightCm: 188,
		bodyFatPercent: 14,
	},
	onCancel: mockOnCancel,
	onSave: mockOnSave,
};

describe("BodyMetricsModal", () => {
	test("renders BodyMetricsModal with empty data", () => {
		render(<BodyMetricsModal {...props} initialMetrics={{}} />);

		expect(screen.getByText("Your body metrics")).toBeOnTheScreen();
		expect(screen.getByText(/Height\s+\(cm\)/i)).toBeOnTheScreen();
		expect(screen.getByText(/Weight\s+\(kg\)/i)).toBeOnTheScreen();
		expect(screen.getByText(/Body Fat\s+\(%\)/i)).toBeOnTheScreen();
		expect(screen.getByText("Cancel")).toBeOnTheScreen();
		expect(screen.getByText("Save")).toBeOnTheScreen();
	});

	test("renders BodyMetricsModal with provided data", () => {
		render(<BodyMetricsModal {...props} />);

		expect(screen.getByDisplayValue("188")).toBeOnTheScreen();
		expect(screen.getByDisplayValue("90")).toBeOnTheScreen();
		expect(screen.getByDisplayValue("14")).toBeOnTheScreen();
	});

	test("cancel button click should call onCancel function", () => {
		render(<BodyMetricsModal {...props} />);

		fireEvent.press(screen.getByText("Cancel"));

		expect(mockOnCancel).toHaveBeenCalledTimes(1);
	});

	test("save button click should call onSave function", () => {
		render(<BodyMetricsModal {...props} />);

		fireEvent.press(screen.getByText("Save"));

		expect(mockOnSave).toHaveBeenCalledTimes(1);
	});
});
