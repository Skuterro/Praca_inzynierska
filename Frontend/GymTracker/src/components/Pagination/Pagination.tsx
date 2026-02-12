import { View, Text, TouchableOpacity } from "react-native";
import { AppStyles } from "../../constants/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import React from "react";

interface PaginationProps {
	page: number;
	totalPages: number;
	onPrev: () => void;
	onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
	if (totalPages == 0) {
		return null;
	}

	return (
		<View style={AppStyles.paginationContainer}>
			<TouchableOpacity style={AppStyles.classicButton} onPress={onPrev}>
				<Ionicons name="chevron-back" size={18} color="black" />
			</TouchableOpacity>

			<Text style={{ fontSize: 16, color: Colors.subTitle }}>
				{page} / {totalPages}
			</Text>

			<TouchableOpacity style={AppStyles.classicButton} onPress={onNext}>
				<Ionicons name="chevron-forward" size={18} color="black" />
			</TouchableOpacity>
		</View>
	);
}
