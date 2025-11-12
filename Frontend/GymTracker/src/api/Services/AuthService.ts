import axiosClient from "../ApiClient";

interface AuthResponse {
	id: string;
	email: string;
	JWT: string;
}

const AuthService = {
	login: async (Email: string, Password: string): Promise<AuthResponse> => {
		const { data } = await axiosClient.post("/auth/login", { Email, Password });
		return data;
	},

	register: async (Email: string, Password: string): Promise<AuthResponse> => {
		const { data } = await axiosClient.post("auth/register", { Email, Password });
		return data;
	},
};

export default AuthService;
