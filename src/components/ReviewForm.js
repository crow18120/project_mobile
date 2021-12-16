import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { globalStyles } from "../styles/globalStyle";
import * as Yup from "yup";
import FlatButton from "./Button";
import { openDatabase } from "../services/dbServices";
import { addReview, editReview } from "../services/reviewServices";
import { addNote, deleteNote, editNote } from "../services/noteServices";

const reviewSchema = Yup.object({
  title: Yup.string().required("Field is required."),
  info: Yup.string().required("Description is required."),
});

const db = openDatabase();

export default function AddForm(props) {
  const { setModalOpen, setList, initialValues, isCreate, setItem, id } = props;
  console.log(initialValues);
  const handleDelete = () => {
    Alert.alert("Delete Note", "You can't undo this action", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteNote(db, initialValues.id, initialValues.apartment, setList);
          setModalOpen(false);
        },
      },
    ]);
  };
  return (
    <ScrollView style={{ padding: 20, paddingBottom: 0, paddingTop: 0 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          Alert.alert(
            isCreate ? "Add a new note" : "Update the note",
            `
  Your submit information: 
  
    - Field: ${values.title}
    - Description: ${values.info}

  Submit your information?
        `,
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  if (isCreate) {
                    addNote(db, values, setList);
                    setModalOpen(false);
                  } else {
                    editNote(db, initialValues.id, values, setList);
                    setModalOpen(false);
                  }
                },
              },
            ]
          );
        }}
      >
        {(props) => (
          <View>
            <Text>Field:</Text>
            <Picker
              name="title"
              selectedValue={
                props.values.title == null ? "" : props.values.title
              }
              onValueChange={props.handleChange("title")}
              style={{ ...globalStyles.input, backgroundColor: "#eee" }}
            >
              <Picker.Item label="Select field" value="" />
              <Picker.Item label="Property" value="Property" />
              <Picker.Item label="Bedrooms" value="Bedrooms" />
              <Picker.Item label="Money" value="Money" />
              <Picker.Item label="Furniture" value="Furniture" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            {props.touched.title && props.errors.title ? (
              <Text style={globalStyles.errorText}>{props.errors.title}</Text>
            ) : null}

            <Text>Description:</Text>
            <TextInput
              name="info"
              style={globalStyles.input}
              placeholder="Description ..."
              onChangeText={props.handleChange("info")}
              values={props.values.info}
              defaultValue={props.initialValues.info}
              // multiline={true}
            />
            {props.touched.info && props.errors.info ? (
              <Text style={globalStyles.errorText}>{props.errors.info}</Text>
            ) : null}

            <FlatButton
              text={isCreate ? "Add" : "Update"}
              onPress={props.handleSubmit}
              color="primary"
            />
            {isCreate ? null : (
              <FlatButton
                text="Delete"
                color="secondary"
                onPress={handleDelete}
              />
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
