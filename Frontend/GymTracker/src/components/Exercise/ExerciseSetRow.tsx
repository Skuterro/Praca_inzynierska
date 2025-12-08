import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

interface ExerciseSetRowProps {
	index: number;
	reps: string;
	weight: string;
	isSaved: boolean;
	isLoading: boolean;
	onChange: (field: "reps" | "weight", value: string) => void;
	onSave: () => void;
}

export default function ExerciseSetRow({
	index,
	reps,
	weight,
	isSaved,
	isLoading,
	onChange,
	onSave,
}: ExerciseSetRowProps) {
	return (
		<View style={[styles.setRow, isSaved && styles.savedRow]}>
			<View style={styles.setNumberContainer}>
				<Text style={[styles.setNumber, isSaved && { color: Colors.subTitle }]}>{index + 1}</Text>
			</View>
			<TextInput
				style={[styles.input, isSaved && styles.inputDisabled]}
				placeholder="0"
				placeholderTextColor={Colors.subTitle}
				keyboardType="numeric"
				value={weight}
				onChangeText={(t) => onChange("weight", t)}
				editable={!isSaved && !isLoading}
			/>
			<TextInput
				style={[styles.input, isSaved && styles.inputDisabled]}
				placeholder="0"
				placeholderTextColor={Colors.subTitle}
				keyboardType="numeric"
				value={reps}
				onChangeText={(t) => onChange("reps", t)}
				editable={!isSaved && !isLoading}
			/>
			<TouchableOpacity
				style={[
					styles.actionBtn,
					isSaved && styles.savedBtn,
					(!reps || !weight) && !isSaved && { opacity: 0.3 },
				]}
				onPress={onSave}
				disabled={isSaved || isLoading || !reps || !weight}
			>
				{isLoading ? (
					<ActivityIndicator size="small" color={Colors.secondary} />
				) : isSaved ? (
					<Ionicons name="checkmark" size={20} color={Colors.colorWhite} />
				) : (
					<Ionicons name="save-outline" size={20} color={Colors.colorWhite} />
				)}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	setRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	savedRow: {
		opacity: 1,
	},
	setNumberContainer: {
		width: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	setNumber: {
		color: Colors.colorWhite,
		fontWeight: "bold",
		fontSize: 14,
	},
	input: {
		flex: 1,
		backgroundColor: Colors.secondary,
		color: Colors.colorWhite,
		borderRadius: 8,
		paddingVertical: 8,
		textAlign: "center",
		marginHorizontal: 6,
		fontSize: 16,
	},
	inputDisabled: {
		backgroundColor: Colors.primary,
		color: Colors.subTitle,
	},
	actionBtn: {
		width: 40,
		height: 40,
		borderRadius: 8,
		backgroundColor: Colors.colorBlue,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 6,
	},
	savedBtn: {
		backgroundColor: Colors.colorGreen,
	},
});
