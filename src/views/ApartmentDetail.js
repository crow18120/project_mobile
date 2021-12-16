import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Card, { CardNote } from "../components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "../components/ReviewForm";
import { deleteReview, getReview } from "../services/reviewServices";
import { openDatabase } from "../services/dbServices";
import { deleteApartment, getApartment } from "../services/apartmentServices";
import ApartmentForm from "../components/ApartmentForm";
import FlatButton from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAllNote } from "../services/noteServices";

const db = openDatabase();

export default function ApartmentDetail({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const [item, setItem] = useState(null);
  const [notes, setNotes] = useState(null);
  const [isCreate, setIsCreate] = useState(true);
  const id = route.params.id;

  React.useEffect(() => {
    getApartment(db, id, setItem);
    getAllNote(db, id, setNotes);
  }, []);

  console.log("note: ", notes);

  return (
    <View style={styles.container}>
      {item == null ? null : (
        <ScrollView style={{ flex: 1 }}>
          <Card style={{ marginTop: 10 }}>
            <Text style={styles.textTitle}>Property type: </Text>
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
          <View style={{ padding: 5 }}>
            <Icon.Button
              name="plus"
              backgroundColor="#3b5998"
              padding={10}
              onPress={() => {
                setModalOpen(true);
                setInitialValues({ title: "", info: "", apartment: id });
                setIsCreate(true);
              }}
            >
              Add note
            </Icon.Button>
          </View>
          {notes == null
            ? null
            : notes.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalOpen(true);
                    setInitialValues(item);
                    setIsCreate(false);
                  }}
                  key={item.id}
                >
                  <CardNote>
                    <Text style={globalStyles.titleText}>{item.title}</Text>
                    <Text style={globalStyles.subTitleText}>{item.info}</Text>
                  </CardNote>
                </TouchableOpacity>
              ))}
        </ScrollView>
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
                {isCreate ? "Add note" : "Edit note"}
              </Text>
            </View>
            <ReviewForm
              setModalOpen={setModalOpen}
              initialValues={initialValues}
              setList={setNotes}
              isCreate={isCreate}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
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
