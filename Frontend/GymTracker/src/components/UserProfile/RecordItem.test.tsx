import { render, screen } from "@testing-library/react-native";
import { ExerciseRecordEnum } from "../../models/enums/ExerciseRecordEnum";
import { PersonalRecord } from "../../models/PersonalRecord";
import RecordItem from "./RecordItem";

const mockOnDelete = jest.fn(() => Promise.resolve());
const mockOnPress = jest.fn();

const BASE_RECORD: PersonalRecord = {
	id: 2,
	exercise: ExerciseRecordEnum.BenchPress,
	weightKg: 105,
	date: new Date("2025-12-15T00:00:00.000Z"),
};
const PREV_RECORD_LOW: PersonalRecord = {
	id: 1,
	exercise: ExerciseRecordEnum.BenchPress,
	weightKg: 100,
	date: new Date("2025-12-14T00:00:00.000Z"),
};
const PREV_RECORD_HIGH: PersonalRecord = {
	id: 1,
	exercise: ExerciseRecordEnum.BenchPress,
	weightKg: 110,
	date: new Date("2025-12-14T00:00:00.000Z"),
};

const setup = (record: PersonalRecord, prevRecord: PersonalRecord | null = null) => {
	return render(<RecordItem record={record} prevRecord={prevRecord} onDelete={mockOnDelete} onPress={mockOnPress} />);
};

describe("RecordItem", () => {
	test("renders current weight, unit, and formatted date", () => {
		setup(BASE_RECORD);

		expect(screen.getByText(/105\s+kg/i)).toBeOnTheScreen();
		expect(screen.getByText("15-12-2025")).toBeOnTheScreen();
	});

	test("does NOT render difference text when prevRecord is null", () => {
		setup(BASE_RECORD, null);

		expect(screen.queryByText("▲")).not.toBeOnTheScreen();
		expect(screen.queryByText("▼")).not.toBeOnTheScreen();
	});

	test("renders positive difference (▲) and value when weight increased", () => {
		setup(BASE_RECORD, PREV_RECORD_LOW);

		expect(screen.getByText("▲ 5 kg")).toBeOnTheScreen();
		expect(screen.queryByText("▼")).not.toBeOnTheScreen();
	});

	test("renders negative difference (▼) and value when weight decreased", () => {
		setup(BASE_RECORD, PREV_RECORD_HIGH);

		expect(screen.getByText("▼ 5 kg")).toBeOnTheScreen();
		expect(screen.queryByText("▲")).not.toBeOnTheScreen();
	});
});
