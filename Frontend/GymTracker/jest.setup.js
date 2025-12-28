import "@testing-library/jest-native/extend-expect";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { cleanup } from "@testing-library/react-native";

afterEach(cleanup);

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@expo/vector-icons", () => {
	const React = require("react");
	return {
		Ionicons: () => React.createElement("Ionicons"),
		Feather: () => React.createElement("Feather"),
		Entypo: () => React.createElement("Entypo"),
		FontAwesome6: () => React.createElement("FontAwesome6"),
	};
});
