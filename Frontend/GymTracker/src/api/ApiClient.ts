import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showErrorToast } from "../utils/Toast";

const BASE_API_URL = "http://192.168.1.17:5199";

const axiosClient = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve(token);
	});

	failedQueue = [];
};

axiosClient.interceptors.request.use(async (config) => {
	const stored = await AsyncStorage.getItem("user");

	if (stored) {
		const user = JSON.parse(stored);
		if (user?.token) {
			config.headers.Authorization = `Bearer ${user.token}`;
		}
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const status = error.response?.status;

		if (!error.response) {
			showErrorToast("Network error", "Please check your internet connection.");
			return Promise.reject(error);
		}

		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = "Bearer " + token;
						return axiosClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			isRefreshing = true;

			try {
				const stored = await AsyncStorage.getItem("user");
				const user = stored ? JSON.parse(stored) : null;

				const refreshResponse = await axios.post(`${BASE_API_URL}/auth/refresh`, {
					refreshToken: user?.refreshToken,
				});

				const newToken = refreshResponse.data.token;
				const updatedUser = { ...user, token: newToken };
				await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

				processQueue(null, newToken);
				isRefreshing = false;

				originalRequest.headers.Authorization = "Bearer " + newToken;

				return axiosClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				isRefreshing = false;

				await AsyncStorage.removeItem("user");

				showErrorToast("Session epxired", "Please sign in again.");

				return Promise.reject(refreshError);
			}
		}

		if (status === 400) {
			const message = error.response.data?.message || "Invalid request data.";

			showErrorToast("Bad request", message);
			return Promise.reject(error);
		}

		if (status >= 500) {
			showErrorToast("Server error", "Something went wrong on the server.");
			return Promise.reject(error);
		}

		showErrorToast("Error", "An error occurred while processing your request.");

		return Promise.reject(error);
	}
);

export default axiosClient;
