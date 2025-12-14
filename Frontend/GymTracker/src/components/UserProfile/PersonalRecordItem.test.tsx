import { render, screen } from "@testing-library/react-native";
import PersonalRecordItem from "./PersonalRecordItem";

const props = {
	value: 100,
	label: "Bench Press",
	onPress: jest.fn(),
};

describe("PersonalRecordItem", () => {
	test("renders PersonalRecordItem with proper data", () => {
		render(<PersonalRecordItem {...props} />);

		expect(screen.getByText("Bench Press")).toBeOnTheScreen();
		expect(screen.getByText("100 kg")).toBeOnTheScreen();
		expect(screen.queryByText("Squat")).not.toBeOnTheScreen();
		expect(screen.queryByText("Deadlift")).not.toBeOnTheScreen();
	});

	test("renders PersonalRecordItem without value", () => {
		render(<PersonalRecordItem {...props} value={undefined} />);

		expect(screen.getByText("-")).toBeOnTheScreen();
	});
});
