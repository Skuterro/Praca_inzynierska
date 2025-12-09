import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePersonalRecords } from "../../hooks/personalRecordsScreen/usePersonalRecords";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { FlatList, View } from "react-native";
import { constants } from "../../constants/Constants";
import { AppStyles } from "../../constants/AppStyles";
import { RouteProp } from "@react-navigation/native";
import LoadingDataContainer from "../../components/LoadingDataContainer";
import ListEmptyComponent from "../../components/List/ListEmptyComponent";
import AddRecordModal from "../../components/Modal/AddRecordModal";
import ListHeader from "../../components/Header/ListHeader";
import RecordItem from "../../components/UserProfile/RecordItem";
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";

type PersonalRecordsScreenRouteProp = RouteProp<RootStackParamList, "PersonalRecords">;
type PersonalRecordsScreenNavProp = NativeStackNavigationProp<RootStackParamList, "PersonalRecords">;

interface PersonalRecordsScreenProps {
	route: PersonalRecordsScreenRouteProp;
	navigation: PersonalRecordsScreenNavProp;
}

export default function PersonalRecordsScreen({ route, navigation }: PersonalRecordsScreenProps) {
	const { personalRecordExercise } = route.params;
	const {
		records,
		loading,
		modalVisible,
		page,
		totalPages,
		getTitle,
		setModalVisible,
		handleAddRecord,
		handleDelete,
		changePage,
	} = usePersonalRecords(personalRecordExercise);

	if (loading) {
		return <LoadingDataContainer />;
	}

	return (
		<View style={AppStyles.mainContainer}>
			<Header title={getTitle()} onButtonClick={() => navigation.goBack()} />
			<View style={AppStyles.contentWrapper}>
				<ListHeader
					title={constants.record.history}
					buttonTitle={constants.record.add}
					onButtonClick={() => setModalVisible(true)}
				/>
				<FlatList
					data={records}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index }) => {
						const prev = index < records.length - 1 ? records[index + 1] : null;

						return (
							<RecordItem
								record={item}
								prevRecord={prev}
								onPress={() => navigation.navigate("StrengthChart", { records: records })}
								onDelete={() => handleDelete(item.id)}
							/>
						);
					}}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
				<Pagination
					page={page}
					totalPages={totalPages}
					onPrev={() => changePage("prev")}
					onNext={() => changePage("next")}
				/>
				<AddRecordModal
					visible={modalVisible}
					onCancel={() => setModalVisible(false)}
					onSave={handleAddRecord}
				/>
			</View>
		</View>
	);
}
