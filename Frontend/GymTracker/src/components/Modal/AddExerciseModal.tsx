import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Exercise } from "../../models/Exercise";
import { Colors } from "../../constants/Colors";
import EntypoIcon from "react-native-vector-icons/Entypo";
import ListEmptyComponent from "../List/ListEmptyComponent";

interface AddExerciseModalProps {
	bodyParts: string[];
	visible: boolean;
	selectedBodyPart: string | null;
	loading: boolean;
	exercises: Exercise[];
	onSelectBodyPart: (bodyPart: string) => void;
	onClose: () => void;
	onAddExercise: (exerciseId: number, sets: number) => Promise<void>;
}

export default function AddExerciseModal({
	bodyParts,
	visible,
	selectedBodyPart,
	loading,
	exercises,
	onSelectBodyPart,
	onClose,
	onAddExercise,
}: AddExerciseModalProps) {
	const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
	const [sets, setSets] = useState(3);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<View style={styles.modalHeader}>
						<Text style={styles.title}>Add exercise</Text>
						<TouchableOpacity onPress={onClose}>
							<EntypoIcon name="cross" size={32} color={"white"} />
						</TouchableOpacity>
					</View>

					<Text style={styles.sectionTitle}>Choose body part</Text>

					<View style={styles.partList}>
						{bodyParts.map((part) => (
							<TouchableOpacity
								key={part}
								style={[styles.partButton, selectedBodyPart === part && styles.partButtonActive]}
								onPress={() => onSelectBodyPart(part)}
							>
								<Text style={styles.partButtonText}>{part}</Text>
							</TouchableOpacity>
						))}
					</View>

					{selectedBodyPart && (
						<>
							<Text style={styles.sectionTitle}>Choose exercise</Text>

							{loading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<FlatList
									data={exercises}
									keyExtractor={(item) => item.id.toString()}
									style={{ maxHeight: 200 }}
									renderItem={({ item }) => (
										<TouchableOpacity
											style={styles.exerciseItem}
											onPress={() => setSelectedExercise(item)}
										>
											<Text style={styles.exerciseText}>{item.name}</Text>
										</TouchableOpacity>
									)}
									ListEmptyComponent={<ListEmptyComponent />}
								/>
							)}
						</>
					)}

					{selectedExercise && (
						<View style={styles.seriesPopup}>
							<Text style={styles.popupTitle}>{selectedExercise.name}</Text>
							<Text style={{ color: "white" }}>Series: {sets}</Text>

							<View style={styles.seriesControls}>
								<TouchableOpacity onPress={() => setSets((s) => Math.max(1, s - 1))}>
									<Text style={styles.seriesButton}>-</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => setSets((s) => s + 1)}>
									<Text style={styles.seriesButton}>+</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity
								style={styles.confirmButton}
								onPress={() => onAddExercise(Number(selectedExercise.id), sets)}
							>
								<Text style={styles.confirmButtonText}>Add</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	modal: {
		width: "85%",
		height: "70%",
		backgroundColor: Colors.secondary,
		padding: 20,
		borderRadius: 15,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	sectionTitle: {
		fontSize: 14,
		marginVertical: 10,
		color: "#ccc",
	},
	partList: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	partButton: {
		padding: 8,
		borderRadius: 8,
		backgroundColor: Colors.primary,
	},
	partButtonActive: {
		backgroundColor: Colors.color1,
	},
	partButtonText: {
		color: "white",
	},
	exerciseItem: {
		padding: 10,
		backgroundColor: Colors.primary,
		borderRadius: 8,
		marginBottom: 6,
	},
	exerciseText: {
		color: "white",
	},
	seriesPopup: {
		marginTop: 20,
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		alignItems: "center",
	},
	popupTitle: {
		fontSize: 16,
		color: "white",
		marginBottom: 10,
	},
	seriesControls: {
		flexDirection: "row",
		gap: 20,
		marginVertical: 10,
	},
	seriesButton: {
		color: "white",
		fontSize: 32,
		fontWeight: "bold",
	},
	confirmButton: {
		backgroundColor: Colors.color1,
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginTop: 10,
	},
	confirmButtonText: {
		color: "black",
		fontWeight: "bold",
	},
	closeButton: {
		marginTop: 15,
		alignSelf: "center",
	},
	closeButtonText: {
		color: "#ddd",
		fontSize: 16,
	},
});
