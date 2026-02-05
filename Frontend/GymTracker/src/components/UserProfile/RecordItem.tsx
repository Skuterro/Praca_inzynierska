import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PersonalRecord } from "../../models/PersonalRecord";
import { AppStyles } from "../../constants/AppStyles";
import { constants } from "../../constants/Constants";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import formatDate from "../../utils/FormatDate";

interface RecordItemProps {
	record: PersonalRecord;
	prevRecord: PersonalRecord | null;
	onDelete: () => Promise<void>;
}

export default function RecordItem({ record, prevRecord, onDelete }: RecordItemProps) {
	const diff = prevRecord ? record.weightKg - prevRecord.weightKg : 0;

	return (
		<View style={styles.recordItem}>
			<View style={{ flex: 1 }}>
				<View style={styles.row}>
					<Text style={AppStyles.title}>
						{record.weightKg} {constants.weight.kg}
					</Text>

					{prevRecord && diff !== 0 && (
						<Text
							style={[styles.diff, diff > 0 ? { color: Colors.colorGreen } : { color: Colors.colorRed }]}
						>
							{diff > 0 ? "▲" : "▼"} {Math.abs(diff)} {constants.weight.kg}
						</Text>
					)}
				</View>
				<Text style={AppStyles.subTitle}>{formatDate(new Date(record.date))}</Text>
			</View>

			<View style={[styles.row, { gap: 10 }]}>
				<TouchableOpacity
					style={[AppStyles.classicButton, { backgroundColor: Colors.colorRed }]}
					onPress={onDelete}
				>
					<Feather name="trash-2" size={18} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	recordItem: {
		backgroundColor: Colors.secondary,
		padding: 16,
		marginBottom: 12,
		borderRadius: 10,
		flexDirection: "row",
	},
	row: {
		flexDirection: "row",
		gap: 3,
		alignItems: "center",
	},
	diff: {
		fontSize: 14,
		fontWeight: "bold",
	},
});
