import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "./ApiClient";

const mockAxios = new MockAdapter(axios);
const mockClient = new MockAdapter(axiosClient);
let storedUser: any = null;

describe("axiosClient", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockAxios.reset();
		mockClient.reset();
	});

	test("adds Authorization header when token is in AsyncStorage", async () => {
		(AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify({ token: "test-token" }));

		mockClient.onGet("/test").reply((config) => {
			expect(config.headers?.Authorization).toBe("Bearer test-token");
			return [200, { ok: true }];
		});

		await axiosClient.get("/test");
	});

	test("refresh token when 401 and repeats request", async () => {
		storedUser = {
			token: "old-token",
			refreshToken: "refresh-token",
		};

		mockClient.onGet("/secure").replyOnce(401);

		mockAxios.onPost("http://192.168.1.17:5199/auth/refresh").reply(200, { token: "new-token" });

		mockClient.onGet("/secure").reply((config) => {
			expect(config.headers?.Authorization).toBe("Bearer new-token");
			return [200, { success: true }];
		});

		const response = await axiosClient.get("/secure");
		expect(response.data.success).toBe(true);
	});

	test("cleans AsyncStorage when refresh token fail", async () => {
		(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
			JSON.stringify({
				token: "old-token",
				refreshToken: "bad-refresh",
			})
		);

		mockClient.onGet("/secure").replyOnce(401);

		mockAxios.onPost("http://192.168.1.17:5199/auth/refresh").reply(401);

		await expect(axiosClient.get("/secure")).rejects.toBeDefined();

		expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");
	});

	test("queues requests during refresh", async () => {
		(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
			JSON.stringify({
				token: "old-token",
				refreshToken: "refresh-token",
			})
		);

		mockClient.onGet("/a").replyOnce(401);
		mockClient.onGet("/b").replyOnce(401);

		mockAxios.onPost("http://192.168.1.17:5199/auth/refresh").reply(200, { token: "new-token" });

		mockClient.onGet("/a").reply(200, { a: true });
		mockClient.onGet("/b").reply(200, { b: true });

		const res = await Promise.all([axiosClient.get("/a"), axiosClient.get("/b")]);

		expect(res[0].data.a).toBe(true);
		expect(res[1].data.b).toBe(true);
	});
});
