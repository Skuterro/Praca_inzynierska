module.exports = {
	preset: "jest-expo",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-clone-referenced-element|expo(nent)?-.*|expo|@expo(nent)?/.*|@expo-google-fonts|@testing-library)/",
	],

	testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
};
