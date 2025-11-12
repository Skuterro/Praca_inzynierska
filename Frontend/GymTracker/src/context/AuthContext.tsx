import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../api/Services/AuthService";

interface AuthContextProps {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

interface User {
	id: string;
	email: string;
	JWT: string;
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

	const login = async (email: string, password: string) => {
		const response = await AuthService.login(email, password);
		setUser(response);
		await AsyncStorage.setItem("user", JSON.stringify(response));
	};

	const register = async (email: string, password: string) => {
		const response = await AuthService.register(email, password);
		setUser(response);
		await AsyncStorage.setItem("user", JSON.stringify(response));
	};

	const logout = async () => {
		setUser(null);
		await AsyncStorage.removeItem("user");
	};

	if (loading) return null;

	return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
