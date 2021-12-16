import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../styles/globalStyle";
import Card from "../components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "../components/ReviewForm";
import ApartmentForm from "../components/ApartmentForm";
import { openDatabase } from "../services/dbServices";
import { getAllReview } from "../services/reviewServices";
import { getAllApartment } from "../services/apartmentServices";
import Icon from "react-native-vector-icons/FontAwesome";

const db = openDatabase();

export default function Home(props) {
  const { navigation } = props;

  const [reviews, setReviews] = useState(null);
  const [data, setData] = useState(reviews);
  const [search, setSearch] = useState(null);

  React.useEffect(
    () =>
      navigation.addListener("focus", () => getAllApartment(db, setReviews)),
    []
  );

  React.useEffect(() => {
    getAllApartment(db, setReviews);
  }, [navigation.isFocused()]);

  React.useEffect(() => {
    setData(reviews);
  }, [reviews]);

  React.useEffect(() => {
    reviews == null
      ? null
      : search == null || search == ""
      ? setData(reviews)
      : setData(
          reviews.filter(
            (ele) =>
              ele.property.toLowerCase().includes(search.toLowerCase()) ||
              ele.money.toString().includes(search)
          )
        );
  }, [search]);

  return (
    <View style={globalStyles.container}>
      <View>
        <View style={{ padding: 5 }}>
          <TextInput
            style={{
              ...globalStyles.input,
              borderColor: "#000",
              margin: 0,
              padding: 5,
              paddingLeft: 15,
              backgroundColor: "#fff",
            }}
            placeholder="Search..."
            onChangeText={(val) => setSearch(val)}
          />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ApartmentDetail", {
                ...item,
              });
            }}
          >
            <Card>
              <Text style={globalStyles.titleText}>{item.property}</Text>
              <Text style={globalStyles.subTitleText}>{item.money}$/month</Text>
              <Text style={globalStyles.subTitleText}>{item.reporter}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 10,
    // alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
