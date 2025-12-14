import "@testing-library/jest-native/extend-expect";
import { cleanup } from "@testing-library/react-native";

afterEach(cleanup);

jest.mock("@expo/vector-icons", () => {
	const React = require("react");
	return {
		Ionicons: () => React.createElement("Ionicons"),
	};
});

jest.mock("react-native-vector-icons/Feather", () => {
	const { Text } = require("react-native");
	return ({ name }) => <Text>{name}</Text>;
});

jest.mock("react-native-vector-icons/Ionicons", () => {
	const { Text } = require("react-native");
	return ({ name }) => <Text>{name}</Text>;
});

jest.mock("react-native-vector-icons/FontAwesome", () => {
	const { Text } = require("react-native");
	return ({ name }) => <Text>{name}</Text>;
});

jest.mock("react-native-vector-icons/Entypo", () => {
	const { Text } = require("react-native");
	return ({ name }) => <Text>{name}</Text>;
});
