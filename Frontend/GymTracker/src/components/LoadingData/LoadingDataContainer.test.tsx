import { render, screen } from "@testing-library/react-native";
import LoadingDataContainer from "./LoadingDataContainer";

describe("LoadingDataContainer", () => {
	test("renders the ActivityIndicator on the screen", () => {
		render(<LoadingDataContainer />);

		expect(screen.getByTestId("activity-indicator")).toBeOnTheScreen();
	});
});
