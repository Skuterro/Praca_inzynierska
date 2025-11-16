import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/User";
import { JwtPayload } from "../models/JwtPayload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../api/Services/AuthService";

interface AuthContextProps {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (username: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const decodeAndSetUser = async (token: string, refreshToken: string) => {
		const payload = jwtDecode<JwtPayload>(token);

		const user: User = {
			name: payload.name,
			email: payload.email,
			token,
			refreshToken,
		};

		setUser(user);
		await AsyncStorage.setItem("user", JSON.stringify(user));
	};

	const logout = async () => {
		if (user?.refreshToken) {
			try {
				await AuthService.logout(user.refreshToken);
			} catch (err) {
			} finally {
			}
		}
		setUser(null);
		await AsyncStorage.removeItem("user");
	};

	const login = async (email: string, password: string) => {
		const response = await AuthService.login(email, password);
		await decodeAndSetUser(response.token, response.refreshToken);
	};

	const register = async (username: string, email: string, password: string) => {
		const response = await AuthService.register(username, email, password);
		await decodeAndSetUser(response.token, response.refreshToken);
	};

	useEffect(() => {
		const init = async () => {
			const stored = await AsyncStorage.getItem("user");

			if (!stored) {
				setLoading(false);
				return;
			}

			const parsed: User = JSON.parse(stored);

			try {
				const refreshed = await AuthService.refreshToken(parsed.refreshToken);

				await decodeAndSetUser(refreshed.token, refreshed.refreshToken ?? parsed.refreshToken);
			} catch {
				await logout();
			}

			setLoading(false);
		};

		init();
	}, []);

	if (loading) return null;

	return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
