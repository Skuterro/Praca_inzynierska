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
								<Text style={{ color: Colors.colorWhite }}>{part}</Text>
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
											style={styles.exerciseItem}
											onPress={() => setSelectedExercise(item)}
										>
											<Text style={{ color: Colors.colorWhite }}>{item.name}</Text>
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
							<Text style={{ color: Colors.colorWhite }}>
								{constants.exercise.series} {sets}
							</Text>
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
	seriesControls: {
		flexDirection: "row",
		gap: 20,
		marginVertical: 10,
	},
	seriesButton: {
		color: Colors.colorWhite,
		fontSize: 32,
		fontWeight: "bold",
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
