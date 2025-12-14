import { render, screen } from "@testing-library/react-native";
import { ActivityGrid } from "./ActivityGrid";
import React from "react";

describe("ActivityGrid", () => {
	test("renders days correctly", () => {
		render(<ActivityGrid sessions={[]} rangeDays={1} />);

		expect(screen.getByText("Mon")).toBeOnTheScreen();
		expect(screen.getByText("Wed")).toBeOnTheScreen();
		expect(screen.getByText("Fri")).toBeOnTheScreen();
	});
});
