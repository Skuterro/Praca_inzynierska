import { render, screen } from "@testing-library/react-native";
import BodyMetricsContainer from "./BodyMetricsContainer";

const props = {
	bodyMetrics: {
		id: 1,
		weightKg: 80,
		heightCm: 180,
		bodyFatPercent: 10,
	},
	onSave: jest.fn(() => Promise.resolve()),
};

describe("BodyMetricsContainer", () => {
	test("renders BodyMetricsContainer with provided data", () => {
		render(<BodyMetricsContainer {...props} />);

		expect(screen.getByText("height")).toBeOnTheScreen();
		expect(screen.getByText("180 cm")).toBeOnTheScreen();
		expect(screen.getByText("weight")).toBeOnTheScreen();
		expect(screen.getByText("80 kg")).toBeOnTheScreen();
		expect(screen.getByText("body fat")).toBeOnTheScreen();
		expect(screen.getByText("10 %")).toBeOnTheScreen();
	});

	test("renders BodyMetricsContainer with empty data", () => {
		const emptyProps = {
			onSave: jest.fn(() => Promise.resolve()),
		};
		render(<BodyMetricsContainer {...emptyProps} />);

		expect(screen.getAllByText("-")).toHaveLength(3);
		expect(screen.getByText("height")).toBeOnTheScreen();
		expect(screen.queryByText("180 cm")).not.toBeOnTheScreen();
		expect(screen.getByText("weight")).toBeOnTheScreen();
		expect(screen.queryByText("80 kg")).not.toBeOnTheScreen();
		expect(screen.getByText("body fat")).toBeOnTheScreen();
		expect(screen.queryByText("10 %")).not.toBeOnTheScreen();
	});
});
