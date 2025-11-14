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

	useEffect(() => {
		const loadUser = async () => {
			const storedUser = await AsyncStorage.getItem("user");
			if (storedUser) setUser(JSON.parse(storedUser));
			setLoading(false);
		};
		loadUser();
	}, []);

	const decodeAndSetUser = async (token: string, refreshToken: string) => {
		const payload = jwtDecode<JwtPayload>(token);

		const user: User = {
			name: payload.name,
			email: payload.email,
			token,
			refreshToken,
		};
		console.log(user);
		setUser(user);
		await AsyncStorage.setItem("user", JSON.stringify(user));
	};

	const login = async (email: string, password: string) => {
		const response = await AuthService.login(email, password);
		await decodeAndSetUser(response.token, response.refreshToken);
	};

	const register = async (username: string, email: string, password: string) => {
		const response = await AuthService.register(username, email, password);
		await decodeAndSetUser(response.token, response.refreshToken);
	};

	const logout = async () => {
		setUser(null);
		await AsyncStorage.removeItem("user");
	};

	if (loading) return null;

	return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
