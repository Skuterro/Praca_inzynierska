import { render, screen, fireEvent } from "@testing-library/react-native";
import Header from "./Header";

const props = {
	title: "Header title",
	onButtonClick: jest.fn(),
};

describe("Header", () => {
	test("renders proper header title and back button", () => {
		render(<Header {...props} />);

		expect(screen.getByText("Header title")).toBeOnTheScreen();
		expect(screen.getByText("arrow-left-circle")).toBeOnTheScreen();
	});

	test("does not render delete button when onDelete is not provided", () => {
		render(<Header {...props} />);

		expect(screen.queryByText("trash-2")).toBeNull();
	});

	test("renders delete button and calls onDelete when pressed", () => {
		const mockOnDelete = jest.fn();
		render(<Header {...props} onDelete={mockOnDelete} />);

		expect(screen.getByText("trash-2")).toBeOnTheScreen();

		fireEvent.press(screen.getByText("trash-2"));
		expect(mockOnDelete).toHaveBeenCalledTimes(1);
	});
});
