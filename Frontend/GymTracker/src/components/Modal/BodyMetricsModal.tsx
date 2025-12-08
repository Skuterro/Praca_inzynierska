import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BodyMetrics } from "../../models/BodyMetrics";
import { AppStyles } from "../../constants/AppStyles";
import { Colors } from "../../constants/Colors";
import { constants } from "../../constants/Constants";

interface BodyMetricsModalProps {
	visible: boolean;
	initialMetrics: Partial<BodyMetrics>;
	onCancel: () => void;
	onSave: (metrics: Partial<BodyMetrics>) => void;
}

export default function BodyMetricsModal({ visible, initialMetrics, onCancel, onSave }: BodyMetricsModalProps) {
	const [metrics, setMetrics] = useState<Partial<BodyMetrics>>(initialMetrics);

	useEffect(() => {
		setMetrics(initialMetrics);
	}, [initialMetrics]);

	const renderMetricInput = (label: string, key: keyof BodyMetrics, unit?: string) => (
		<View key={key} style={{ marginBottom: 12 }}>
			<Text style={styles.label}>
				{label} {unit && <Text style={styles.unit}>({unit})</Text>}
			</Text>

			<TextInput
				style={AppStyles.modalInput}
				keyboardType="numeric"
				value={metrics[key]?.toString() ?? ""}
				onChangeText={(text) => setMetrics({ ...metrics, [key]: text === "" ? undefined : Number(text) })}
			/>
		</View>
	);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
					<View style={AppStyles.modalOverlay}>
						<View style={AppStyles.modalContent}>
							<Text style={AppStyles.modalTitle}>{constants.bodyMetrics.label}</Text>

							{renderMetricInput("Height", "heightCm", "cm")}
							{renderMetricInput("Weight", "weightKg", "kg")}
							{renderMetricInput("Body Fat", "bodyFatPercent", "%")}

							<View style={AppStyles.modalButtonsContainer}>
								<TouchableOpacity style={AppStyles.modalButton} onPress={onCancel}>
									<Text style={AppStyles.modalButtonText}>{constants.cancel}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={AppStyles.modalButton} onPress={() => onSave(metrics)}>
									<Text style={AppStyles.modalButtonText}>{constants.save}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	label: {
		color: Colors.colorWhite,
		fontSize: 15,
		marginBottom: 4,
	},
	unit: {
		color: Colors.colorWhite,
		fontSize: 14,
	},
});
