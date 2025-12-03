import { View, Dimensions, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { LineChart } from "react-native-chart-kit";
import { AppStyles } from "../../constants/AppStyles";
import { RouteProp } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import Header from "../../components/Header/Header";

type StrengthChartRouteProp = RouteProp<RootStackParamList, "StrengthChart">;
type StrengthChartNavProp = NativeStackNavigationProp<RootStackParamList, "StrengthChart">;

interface StrengthChartScreenProps {
	route: StrengthChartRouteProp;
	navigation: StrengthChartNavProp;
}

export default function StrengthChartScreen({ route, navigation }: StrengthChartScreenProps) {
	const { records } = route.params;

	const sorted = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	const labels = sorted.map((r) => new Date(r.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }));

	const weights = sorted.map((r) => r.weightKg);

	return (
		<View style={AppStyles.mainContainer}>
			<Header title="Progress chart" onButtonClick={() => navigation.goBack()} />
			<View style={AppStyles.contentWrapper}>
				{records.length === 0 ? (
					<ListEmptyComponent />
				) : (
					<ScrollView horizontal>
						<LineChart
							data={{
								labels,
								datasets: [
									{
										data: weights,
										strokeWidth: 3,
									},
								],
							}}
							width={Math.max(Dimensions.get("window").width, labels.length * 60)}
							height={Dimensions.get("window").height / 2}
							yAxisSuffix="kg"
							fromZero
							chartConfig={{
								backgroundColor: Colors.primary,
								backgroundGradientFrom: Colors.primary,
								backgroundGradientTo: Colors.primary,
								color: (opacity = 1) =>
									`${Colors.colorYellow}${Math.round(opacity * 255)
										.toString(16)
										.padStart(2, "0")}`,
								labelColor: () => Colors.colorWhite,
								propsForDots: {
									r: "5",
									strokeWidth: "2",
									stroke: Colors.colorYellow,
								},
							}}
							style={{
								marginVertical: 16,
								borderRadius: 16,
							}}
							bezier
						/>
					</ScrollView>
				)}
			</View>
		</View>
	);
}
