import { Alert } from "react-native";
import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://192.168.1.17:5199",
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.error || error.message || "An unexpected error occurred.";

		Alert.alert("Error", message);

		return Promise.reject(error);
	}
);

export default axiosClient;
