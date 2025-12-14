import { render, screen } from "@testing-library/react-native";
import Pagination from "./Pagination";

const props = {
	page: 2,
	totalPages: 5,
	onPrev: jest.fn(),
	onNext: jest.fn(),
};

describe("Pagination", () => {
	test("renders current page and total pages correctly", () => {
		render(<Pagination {...props} />);

		expect(screen.getByText("2 / 5")).toBeOnTheScreen();
	});
});
