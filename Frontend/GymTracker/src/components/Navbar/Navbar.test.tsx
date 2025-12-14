import { render } from "@testing-library/react-native";

const MockNavItem = jest.fn(() => null);

jest.mock("./NavItem", () => ({
	__esModule: true,
	default: MockNavItem,
}));

const Navbar = require("./Navbar").default;

const ROUTES = [
	{ key: "home", name: "Home", params: {} },
	{ key: "sessions", name: "Sessions", params: {} },
	{ key: "profile", name: "Profile", params: {} },
];
const MOCK_INSETS = { bottom: 0, left: 0, right: 0, top: 0 };

const props = {
	state: {
		index: 0,
		key: "stack",
		routeNames: ROUTES.map((r) => r.name),
		routes: ROUTES as any,
		type: "tab",
		stale: false,
	} as any,
	navigation: {
		navigate: jest.fn(),
		emit: jest.fn(),
	} as any,
	descriptors: {} as any,
	insets: MOCK_INSETS,
};

describe("Navbar", () => {
	test("renders Navbar with all provided NavItems", () => {
		render(<Navbar {...props} />);

		expect(MockNavItem).toHaveBeenCalledTimes(ROUTES.length);
	});
});
