import { render, screen } from "@testing-library/react-native";
import UserProfileHeader from "./UserProfileHeader";

const mockUser = {
	name: "MockedUserName",
	email: "MockedUserEmail",
	token: "token",
	refreshToken: "refreshToken",
};
const mockAuthValue = { user: mockUser };
jest.mock("../../context/AuthContext", () => ({
	useAuth: jest.fn(() => mockAuthValue),
}));

jest.mock("../../../assets/logo.png", () => 1);

describe("UserProfileHeader", () => {
	test("renders the nickname from AuthContext", () => {
		render(<UserProfileHeader />);

		expect(screen.getByText("MockedUserName")).toBeOnTheScreen();
	});
});
