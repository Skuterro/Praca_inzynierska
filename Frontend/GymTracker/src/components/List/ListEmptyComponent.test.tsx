import { render, screen } from "@testing-library/react-native";
import { constants } from "../../constants/Constants";
import ListEmptyComponent from "./ListEmptyComponent";

jest.mock("lottie-react-native", () => {
	const React = require("react");
	const { View } = require("react-native");

	return (props: any) => <View testID="lottie-mock" accessibilityLabel="Empty List Animation" />;
});

describe("ListEmptyComponent", () => {
	test("renders the ListEmptyComponent with proper notification and lottie", () => {
		render(<ListEmptyComponent />);

		expect(screen.getByTestId("lottie-mock")).toBeOnTheScreen();
		expect(screen.getByText(constants.emptyList)).toBeOnTheScreen();
	});
});
