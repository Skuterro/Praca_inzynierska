import { render, screen } from "@testing-library/react-native";
import { PlanItem } from "./PlanItem";

const props = {
	plan: {
		id: 1,
		name: "TestPlan",
		isActive: true,
	},
	onPress: jest.fn(),
};

describe("PlanItem", () => {
	test("renders PlanItem with provided active plan", () => {
		render(<PlanItem {...props} />);

		expect(screen.getByText("TestPlan")).toBeOnTheScreen();
		expect(screen.getByText("Active")).toBeOnTheScreen();
	});

	test("renders PlanItem with provided inactive plan", () => {
		props.plan.isActive = false;
		render(<PlanItem {...props} />);

		expect(screen.getByText("TestPlan")).toBeOnTheScreen();
		expect(screen.queryByText("Active")).not.toBeOnTheScreen();
	});
});
