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

  const [modalOpen, setModalOpen] = useState(false);
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
  }, []);

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
      <Modal
        visible={modalOpen}
        animationType="slide"
        style={globalStyles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-back"
                size={18}
                onPress={() => setModalOpen(false)}
                style={{
                  borderWidth: 1,
                  borderColor: "#f2f2f2",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 20,
                }}
              >
                Add new apartment
              </Text>
            </View>
            <ApartmentForm
              setModalOpen={setModalOpen}
              setReviews={setReviews}
              initialValues={{
                property: "",
                bedrooms: "",
                money: "",
                furniture: "",
                note: "",
                reporter: "",
                date: new Date().toLocaleDateString(),
              }}
              isCreate={true}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 5, width: "30%" }}>
          <Icon.Button
            name="plus"
            backgroundColor="#3b5998"
            padding={10}
            onPress={() => {
              setModalOpen(true);
            }}
          >
            Add
          </Icon.Button>
        </View>
        <View style={{ padding: 5, width: "65%" }}>
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
        style={{ backgroundColor: "#fff", paddingHorizontal: 10, borderRadius: 10 }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ReviewDetail", {
                ...item,
                setReviews: setReviews,
              });
            }}
            style={{
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              padding: 5,
            }}
          >
            <Text style={globalStyles.titleText}>{item.property}</Text>
            <Text style={globalStyles.subTitleText}>{item.money}$/month</Text>
            <Text style={globalStyles.subTitleText}>{item.reporter}</Text>
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
