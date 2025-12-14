import { render, screen } from "@testing-library/react-native";
import BodyMetricsItem from "./BodyMetricsItem";

jest.mock("@expo/vector-icons", () => {
	const { View } = require("react-native");

	return {
		Ionicons: (props: any) => <View testID={`icon-${props.name}`} {...props} />,
	};
});

const props = {
	icon: "body-outline" as const,
	value: 185,
	label: "height",
	unit: "cm",
};

describe("BodyMetricsItem", () => {
	test("renders BodyMetricsItem with provided height data", () => {
		render(<BodyMetricsItem {...props} />);

		expect(screen.getByTestId("icon-body-outline")).toBeOnTheScreen();
		expect(screen.getByText("height")).toBeOnTheScreen();
		expect(screen.getByText("185 cm")).toBeOnTheScreen();
	});

	test("renders BodyMetricsItem with provided weight data", () => {
		const altProps = {
			icon: "barbell-outline" as const,
			value: 80,
			label: "weight",
		};
		render(<BodyMetricsItem {...altProps} />);

		expect(screen.getByTestId("icon-barbell-outline")).toBeOnTheScreen();
		expect(screen.getByText("weight")).toBeOnTheScreen();
		expect(screen.getByText("80 kg")).toBeOnTheScreen();
	});

	test("renders BodyMetricsItem without value", () => {
		render(<BodyMetricsItem {...props} value={undefined} />);

		expect(screen.getByTestId("icon-body-outline")).toBeOnTheScreen();
		expect(screen.getByText("height")).toBeOnTheScreen();
		expect(screen.getByText("-")).toBeOnTheScreen();
	});
});
