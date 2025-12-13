import { render, screen, fireEvent } from "@testing-library/react-native";
import ListHeader from "./ListHeader";

const props = {
	buttonTitle: "Button title",
};

describe("ListHeader", () => {
	test("renders button title when provided", () => {
		render(<ListHeader {...props} />);

		expect(screen.getByText("Button title")).toBeOnTheScreen();
	});

	test("renders title and button title when provided", () => {
		render(<ListHeader {...props} title="Header title" />);

		expect(screen.getByText("Button title")).toBeOnTheScreen();
		expect(screen.getByText("Header title")).toBeOnTheScreen();
	});

	test("render no title when not provided", () => {
		render(<ListHeader {...props} />);

		expect(screen.queryByText("Header title")).not.toBeOnTheScreen();
	});

	test("call onButtonClick when the button is pressed and not disabled", () => {
		const mockOnButtonClick = jest.fn();
		render(<ListHeader {...props} disabled={false} onButtonClick={mockOnButtonClick} />);

		fireEvent.press(screen.getByText("Button title"));

		expect(mockOnButtonClick).toHaveBeenCalled();
	});

	test("does not call onButtonClick when the button is pressed and disabled", () => {
		const mockOnButtonClick = jest.fn();
		render(<ListHeader {...props} disabled={true} onButtonClick={mockOnButtonClick} />);

		fireEvent.press(screen.getByText("Button title"));

		expect(mockOnButtonClick).not.toHaveBeenCalled();
	});
});
