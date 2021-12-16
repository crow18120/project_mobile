import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "../components/ReviewForm";
import { deleteReview, getReview } from "../services/reviewServices";
import { openDatabase } from "../services/dbServices";
import { deleteApartment, getApartment } from "../services/apartmentServices";
import ApartmentForm from "../components/ApartmentForm";
import FlatButton from "../components/Button";

const db = openDatabase();

export default function ReviewDetail({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState(null);
  const id = route.params.id;
  const setReviews = route.params.setReviews;

  React.useEffect(() => {
    getApartment(db, id, setItem);
  }, []);

  const handleDelete = () => {
    Alert.alert("Delete Detail", "You can't undo this action", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteApartment(db, id, setReviews);
          navigation.goBack();
        },
      },
    ]);
  };
  console.log(item);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <FlatButton
          text={
            <Text
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons name="edit" size={18} />
              <Text style={{ alignItems: "center" }}> Edit</Text>
            </Text>
          }
          onPress={() => setModalOpen(true)}
          color={"primary"}
          style={{ width: 100 }}
        />
        <FlatButton
          text={
            <Text
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons name="delete-forever" size={18} />
              <Text style={{ alignItems: "center" }}> Delete</Text>
            </Text>
          }
          onPress={handleDelete}
          color={"secondary"}
          style={{ width: 120 }}
        />
      </View>
      {item == null ? null : (
        <Card>
          <Text style={styles.textTitle}>Property types: </Text>
          <Text style={styles.textInfo}>{item.property}</Text>
          <Text style={styles.textTitle}>Bedroom: </Text>
          <Text style={styles.textInfo}>{item.bedrooms}</Text>
          <Text style={styles.textTitle}>Money rent: </Text>
          <Text style={styles.textInfo}>{item.money}$/month</Text>
          <Text style={styles.textTitle}>Furniture: </Text>
          <Text style={styles.textInfo}>
            {item.furniture == "" ? "No information" : item.furniture}
          </Text>
          <Text style={styles.textTitle}>Date: </Text>
          <Text style={styles.textInfo}>{item.date}</Text>
          <Text style={styles.textTitle}>Note: </Text>
          <Text style={styles.textInfo}>
            {item.note == "" ? "No information" : item.note}
          </Text>
          <Text style={styles.textTitle}>Reporter: </Text>
          <Text style={styles.textInfo}>{item.reporter}</Text>
        </Card>
      )}
      <Modal visible={modalOpen} animationType="slide">
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
                Edit apartment
              </Text>
            </View>
            <ApartmentForm
              setModalOpen={setModalOpen}
              initialValues={item}
              setItem={setItem}
              isCreate={false}
              id={id}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  textTitle: { fontSize: 12, color: "coral" },
  textInfo: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
  },
});
