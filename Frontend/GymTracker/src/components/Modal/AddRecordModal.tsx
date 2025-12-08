import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { Colors } from "../../constants/Colors";

interface AddRecordModalProps {
	visible: boolean;
	onCancel: () => void;
	onSave: (weightKg: number) => void;
}

export default function AddRecordModal({ visible, onCancel, onSave }: AddRecordModalProps) {
	const [weight, setWeight] = useState<string>("");

	const handleSave = () => {
		const numWeight = Number(weight);
		if (!numWeight || numWeight <= 0) return;
		onSave(numWeight);
		setWeight("");
	};

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={AppStyles.modalOverlay}>
				<View style={AppStyles.modalContent}>
					<Text style={AppStyles.modalTitle}>{constants.record.add}</Text>
					<Text style={{ color: Colors.colorWhite, marginBottom: 4 }}>
						{constants.weight.label} ({constants.weight.kg})
					</Text>
					<TextInput
						style={AppStyles.modalInput}
						keyboardType="numeric"
						value={weight}
						onChangeText={setWeight}
						placeholder="0"
						placeholderTextColor="#aaa"
					/>
					<View style={AppStyles.modalButtonsContainer}>
						<TouchableOpacity style={AppStyles.modalButton} onPress={onCancel}>
							<Text style={AppStyles.modalButtonText}>{constants.cancel}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={AppStyles.modalButton} onPress={handleSave}>
							<Text style={AppStyles.modalButtonText}>{constants.save}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
