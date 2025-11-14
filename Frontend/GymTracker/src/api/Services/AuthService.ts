import { AuthResponse } from "../../models/AuthResponse";
import axiosClient from "../ApiClient";

const AuthService = {
	login: async (Email: string, Password: string): Promise<AuthResponse> => {
		const { data } = await axiosClient.post("/auth/login", { Email, Password });
		return data;
	},

	register: async (UserName: string, Email: string, Password: string): Promise<AuthResponse> => {
		const { data } = await axiosClient.post("/auth/register", { UserName, Email, Password });
		return data;
	},
};

export default AuthService;
