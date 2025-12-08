import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { BodyMetrics } from "../../models/BodyMetrics";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import BodyMetricsModal from "../Modal/BodyMetricsModal";
import BodyMetricsItem from "./BodyMetricsItem";

interface BodyMetricsContainerProps {
	bodyMetrics?: BodyMetrics | null;
	onSave: (metrics: Partial<BodyMetrics>) => Promise<void>;
}

export default function BodyMetricsContainer({ bodyMetrics, onSave }: BodyMetricsContainerProps) {
	const [modalVisible, setModalVisible] = useState(false);

	const handleSave = async (metrics: Partial<BodyMetrics>) => {
		await onSave(metrics);
		setModalVisible(false);
	};

	return (
		<>
			<View style={styles.bodyMetricsContainer}>
				<BodyMetricsItem icon="body-outline" value={bodyMetrics?.heightCm} label="height" unit="cm" />
				<BodyMetricsItem icon="barbell-outline" value={bodyMetrics?.weightKg} label="weight" />
				<BodyMetricsItem icon="fitness-outline" value={bodyMetrics?.bodyFatPercent} label="body fat" unit="%" />
				<TouchableOpacity style={styles.updateSmallButton} onPress={() => setModalVisible(true)}>
					<Text style={styles.updateSmallButtonText}>{bodyMetrics ? "Update" : "Set"}</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.borderBottom}></Text>
			<BodyMetricsModal
				visible={modalVisible}
				initialMetrics={bodyMetrics ?? {}}
				onCancel={() => setModalVisible(false)}
				onSave={handleSave}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	bodyMetricsContainer: {
		gap: 10,
		marginVertical: 10,
	},
	updateSmallButton: {
		position: "absolute",
		right: 0,
		bottom: 5,
		backgroundColor: Colors.colorYellow,
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 6,
	},
	updateSmallButtonText: {
		color: "black",
		fontWeight: "bold",
		fontSize: 14,
	},
	borderBottom: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.subTitle,
		marginBottom: 10,
	},
});
