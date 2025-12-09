import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AppNavigator";

export const Stack = createNativeStackNavigator<RootStackParamList>();
