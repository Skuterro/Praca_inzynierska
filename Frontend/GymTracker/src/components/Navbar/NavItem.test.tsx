import { render, screen, fireEvent } from "@testing-library/react-native";
import { constants } from "../../constants/Constants";
import NavItem from "./NavItem";
import React from "react";

const mockOnPress = jest.fn();

const setup = (name: string, isFocused: boolean) => {
	const route = {
		key: name,
		name: name,
		params: {},
	};
	return render(<NavItem route={route as any} isFocused={isFocused} onPress={mockOnPress} />);
};

describe("NavItem", () => {
	test("renders text for Home and calls onPress", () => {
		setup("Home", true);

		expect(screen.getByText("Home")).toBeOnTheScreen();

		const button = screen.getByText("Home");
		fireEvent.press(button);
		expect(mockOnPress).toHaveBeenCalledTimes(1);
	});

	test("renders text for Workout Sessions", () => {
		setup("Sessions", true);

		expect(screen.getByText(constants.navbar.sessions)).toBeOnTheScreen();
	});

	test("renders text for Workout Plans", () => {
		setup("WorkoutPlans", true);

		expect(screen.getByText(constants.navbar.workoutPlans)).toBeOnTheScreen();
	});

	test("renders text for Profile", () => {
		setup("Profile", true);

		expect(screen.getByText("Profile")).toBeOnTheScreen();
	});

	test("does not render text when not focused", () => {
		setup("Home", false);

		expect(screen.queryByText("Home")).not.toBeOnTheScreen();
	});
});
