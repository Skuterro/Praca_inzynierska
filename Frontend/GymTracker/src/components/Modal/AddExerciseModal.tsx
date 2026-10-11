import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { Exercise } from "../../models/Exercise";
import { Colors } from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import ListEmptyComponent from "../List/ListEmptyComponent";

interface AddExerciseModalProps {
	bodyParts: string[];
	visible: boolean;
	selectedBodyPart: string | null;
	loading: boolean;
	exercises: Exercise[];
	onSelectBodyPart: (bodyPart: string) => void;
	onClose: () => void;
	onAddExercise: (exerciseId: number, sets: number, minReps: number, maxReps: number) => Promise<void>;
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
	const [minReps, setMinReps] = useState(8);
	const [maxReps, setMaxReps] = useState(12);

	const handleMinRepsChange = (delta: number) => {
		setMinReps((current) => {
			const next = Math.max(1, Math.min(30, current + delta));
			if (next > maxReps) {
				setMaxReps(next);
			}
			return next;
		});
	};

	const handleMaxRepsChange = (delta: number) => {
		setMaxReps((current) => {
			const next = Math.max(minReps, Math.min(30, current + delta));
			return next;
		});
	};

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={AppStyles.modalOverlay}>
				<View style={styles.modal}>
					<View style={styles.modalHeader}>
						<Text style={AppStyles.title}>{constants.exercise.add}</Text>
						<TouchableOpacity onPress={onClose}>
							<Entypo name="cross" size={32} color={Colors.colorWhite} />
						</TouchableOpacity>
					</View>

					<Text style={styles.sectionTitle}>{constants.exercise.chooseBodyPart}</Text>

					<View style={styles.partList}>
						{bodyParts.map((part) => (
							<TouchableOpacity
								key={part}
								style={[
									styles.partButton,
									selectedBodyPart === part && { backgroundColor: Colors.colorYellow },
								]}
								onPress={() => onSelectBodyPart(part)}
							>
								<Text
									style={{ color: selectedBodyPart === part ? Colors.colorBlack : Colors.colorWhite }}
								>
									{part}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{selectedBodyPart && (
						<>
							<Text style={styles.sectionTitle}>{constants.exercise.choose}</Text>

							{loading ? (
								<ActivityIndicator size="small" color={Colors.colorWhite} />
							) : (
								<FlatList
									data={exercises}
									keyExtractor={(item) => item.id.toString()}
									style={{ maxHeight: 200 }}
									renderItem={({ item }) => (
										<TouchableOpacity
											style={[
												styles.exerciseItem,
												selectedExercise?.id === item.id && {
													backgroundColor: Colors.colorYellow,
												},
											]}
											onPress={() => setSelectedExercise(item)}
										>
											<Text
												style={{
													color:
														selectedExercise?.id === item.id
															? Colors.colorBlack
															: Colors.colorWhite,
												}}
											>
												{item.name}
											</Text>
										</TouchableOpacity>
									)}
									ListEmptyComponent={<ListEmptyComponent />}
								/>
							)}
						</>
					)}

					{selectedExercise && (
						<View style={styles.seriesPopup}>
							<Text style={AppStyles.title}>{selectedExercise.name}</Text>
							<View style={styles.controlsRow}>
								<View style={styles.controlColumn}>
									<Text style={styles.controlLabel}>
										{constants.exercise.series} {sets}
									</Text>
									<View style={styles.seriesControls}>
										<TouchableOpacity onPress={() => setSets((s) => Math.max(1, s - 1))}>
											<Text style={styles.seriesButton}>-</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => setSets((s) => Math.min(10, s + 1))}>
											<Text style={styles.seriesButton}>+</Text>
										</TouchableOpacity>
									</View>
								</View>

								<View style={styles.controlColumn}>
									<Text style={styles.controlLabel}>
										{constants.exercise.minReps} {minReps}
									</Text>
									<View style={styles.seriesControls}>
										<TouchableOpacity onPress={() => handleMinRepsChange(-1)}>
											<Text style={styles.seriesButton}>-</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => handleMinRepsChange(1)}>
											<Text style={styles.seriesButton}>+</Text>
										</TouchableOpacity>
									</View>
								</View>

								<View style={styles.controlColumn}>
									<Text style={styles.controlLabel}>
										{constants.exercise.maxReps} {maxReps}
									</Text>
									<View style={styles.seriesControls}>
										<TouchableOpacity onPress={() => handleMaxRepsChange(-1)}>
											<Text style={styles.seriesButton}>-</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => handleMaxRepsChange(1)}>
											<Text style={styles.seriesButton}>+</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>

							<TouchableOpacity
								style={styles.confirmButton}
								onPress={() => onAddExercise(Number(selectedExercise.id), sets, minReps, maxReps)}
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
	sectionTitle: {
		fontSize: 14,
		marginVertical: 10,
		color: Colors.colorWhite,
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
	exerciseItem: {
		padding: 10,
		backgroundColor: Colors.primary,
		borderRadius: 8,
		marginBottom: 6,
	},
	seriesPopup: {
		marginTop: 20,
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		alignItems: "center",
	},
	controlsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginVertical: 10,
		gap: 8,
	},
	controlColumn: {
		flex: 1,
		alignItems: "center",
	},
	controlLabel: {
		color: Colors.colorWhite,
		fontSize: 12,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 4,
	},
	seriesControls: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
	},
	seriesButton: {
		color: Colors.colorWhite,
		fontSize: 26,
		fontWeight: "bold",
		paddingHorizontal: 6,
	},
	confirmButton: {
		backgroundColor: Colors.colorYellow,
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginTop: 10,
	},
	confirmButtonText: {
		color: Colors.colorBlack,
		fontWeight: "bold",
	},
});
