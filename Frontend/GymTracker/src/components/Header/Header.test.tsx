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
		expect(screen.getByTestId("arrow-left")).toBeOnTheScreen();
	});

	test("does not render delete button when onDelete is not provided", () => {
		render(<Header {...props} />);

		expect(screen.queryByTestId("trash")).toBeNull();
	});

	test("renders delete button and calls onDelete when pressed", () => {
		const mockOnDelete = jest.fn();
		render(<Header {...props} onDelete={mockOnDelete} />);

		expect(screen.getByTestId("trash")).toBeOnTheScreen();

		fireEvent.press(screen.getByTestId("trash"));
		expect(mockOnDelete).toHaveBeenCalledTimes(1);
	});
});
