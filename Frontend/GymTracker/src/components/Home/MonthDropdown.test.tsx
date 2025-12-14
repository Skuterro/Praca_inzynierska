import { render, screen } from "@testing-library/react-native";
import MonthDropdown from "./MonthDropdown";
import React from "react";

const mockSetMonthIndex = jest.fn();

const props = {
	monthIndex: 0,
	setMonthIndex: mockSetMonthIndex,
};

describe("MonthDropdown", () => {
	test("renders MonthDropdown with Januray selected", () => {
		render(<MonthDropdown {...props} />);

		expect(screen.getAllByText("January")).toHaveLength(2);
		expect(screen.getAllByText("February")).toHaveLength(1);
		expect(screen.getAllByText("March")).toHaveLength(1);
		expect(screen.getAllByText("April")).toHaveLength(1);
		expect(screen.getAllByText("May")).toHaveLength(1);
		expect(screen.getAllByText("June")).toHaveLength(1);
		expect(screen.getAllByText("July")).toHaveLength(1);
		expect(screen.getAllByText("August")).toHaveLength(1);
		expect(screen.getAllByText("September")).toHaveLength(1);
		expect(screen.getAllByText("October")).toHaveLength(1);
		expect(screen.getAllByText("November")).toHaveLength(1);
		expect(screen.getAllByText("December")).toHaveLength(1);
	});
});
