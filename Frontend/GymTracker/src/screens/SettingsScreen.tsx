import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SettingsMain">;

type SettingsScreenProps = {
	navigation: SettingsScreenNavigationProp;
};

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
