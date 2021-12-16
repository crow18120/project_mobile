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
import { addApartment, editApartment } from "../services/apartmentServices";
import Icon from "react-native-vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const reviewSchema = Yup.object({
  property: Yup.string().required("Property is required."),
  bedrooms: Yup.string().required("Bedroom is required."),
  money: Yup.string()
    .required("Money is required.")
    .test("is-num-1-5", "Rating must be a number > 0", (val) => {
      return parseInt(val) > 0;
    }),
  furniture: Yup.string().nullable(),
  note: Yup.string(),
  reporter: Yup.string().required("Reporter is required."),
  date: Yup.string().required("Date is required."),
});

const db = openDatabase();

export default function ApartmentForm(props) {
  const { setModalOpen, setReviews, initialValues, isCreate, setItem, id } =
    props;
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  return (
    <ScrollView style={{ padding: 20, paddingBottom: 0, paddingTop: 0 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          Alert.alert(
            isCreate ? "Add a new apartment" : "Update the apartment",
            `
    Your submit information: 
    
      - Property type: ${values.property}
      - Bedrooms: ${values.bedrooms}
      - Money: ${values.money}
      - Furniture: ${
                values.furniture == "" ? "No information" : values.furniture
              }
      - Date: ${values.date}
      - Note:  ${values.note == "" ? "No information" : values.note}
      - Reporter: ${values.reporter}

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
                    addApartment(db, values, setReviews);
                    setModalOpen(false);
                  } else {
                    editApartment(db, id, values, setItem);
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
            <Text>Property type:</Text>
            <TextInput
              name="property"
              style={globalStyles.input}
              placeholder="Property type..."
              onChangeText={props.handleChange("property")}
              values={props.values.property}
              defaultValue={props.initialValues.property}
            />
            {props.touched.property && props.errors.property ? (
              <Text style={globalStyles.errorText}>
                {props.errors.property}
              </Text>
            ) : null}

            <Text>Bedroom: </Text>
            <Picker
              name="bedrooms"
              selectedValue={
                props.values.bedrooms == null ? "" : props.values.bedrooms
              }
              onValueChange={props.handleChange("bedrooms")}
              style={{ ...globalStyles.input, backgroundColor: "#eee" }}
            >
              <Picker.Item label="Select bedroom type" value="" />
              <Picker.Item label="Studio" value="Studio" />
              <Picker.Item label="One" value="One" />
              <Picker.Item label="Two" value="Two" />
              <Picker.Item label="Three" value="Three" />
            </Picker>
            {props.touched.bedrooms && props.errors.bedrooms ? (
              <Text style={globalStyles.errorText}>
                {props.errors.bedrooms}
              </Text>
            ) : null}

            <Text>Money rent:</Text>
            <TextInput
              name="money"
              style={globalStyles.input}
              placeholder="Money rent..."
              onChangeText={props.handleChange("money")}
              values={props.values.money}
              defaultValue={props.initialValues.money.toString()}
              keyboardType="numeric"
            />
            {props.touched.money && props.errors.money ? (
              <Text style={globalStyles.errorText}>{props.errors.money}</Text>
            ) : null}

            <Text>Furniture: </Text>
            <Picker
              name="furniture"
              selectedValue={props.values.furniture}
              onValueChange={props.handleChange("furniture")}
              style={{ ...globalStyles.input, backgroundColor: "#eee" }}
            >
              <Picker.Item label="Select furniture type" value="" />
              <Picker.Item label="Furnished" value="Furnished" />
              <Picker.Item label="Unfurnished" value="Unfurnished" />
              <Picker.Item label="Part Furnished" value="Part Furnished" />
            </Picker>
            {props.touched.furniture && props.errors.furniture ? (
              <Text style={globalStyles.errorText}>
                {props.errors.furniture}
              </Text>
            ) : null}

            <Text>Date:</Text>
            <View style={{ marginVertical: 10 }}>
              <Icon.Button
                name="clock-o"
                backgroundColor="#eee"
                color="#000"
                padding={10}
                onPress={() => {
                  setShow(true);
                }}
              >
                {props.values.date == ""
                  ? new Date().toLocaleDateString()
                  : props.values.date}
              </Icon.Button>
            </View>
            {props.touched.date && props.errors.date ? (
              <Text style={globalStyles.errorText}>{props.errors.date}</Text>
            ) : null}
            {show && (
              <RNDateTimePicker
                testID="dateTimePicker"
                name="date"
                value={
                  props.values.date == ""
                    ? new Date()
                    : new Date(props.values.date)
                }
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShow(false);
                  props.setFieldValue(
                    "date",
                    currentDate.toLocaleDateString(),
                    false
                  );
                }}
              />
            )}

            <Text>Note:</Text>
            <TextInput
              name="note"
              style={globalStyles.input}
              placeholder="Note ..."
              onChangeText={props.handleChange("note")}
              values={props.values.note}
              defaultValue={props.initialValues.money.toString()}
            />
            {props.touched.note && props.errors.note ? (
              <Text style={globalStyles.errorText}>{props.errors.note}</Text>
            ) : null}

            <Text>Reporter:</Text>
            <TextInput
              name="reporter"
              style={globalStyles.input}
              placeholder="Reporter..."
              onChangeText={props.handleChange("reporter")}
              values={props.values.reporter}
              defaultValue={props.initialValues.reporter.toString()}
            />
            {props.touched.reporter && props.errors.reporter ? (
              <Text style={globalStyles.errorText}>
                {props.errors.reporter}
              </Text>
            ) : null}

            <FlatButton
              text="Submit"
              onPress={props.handleSubmit}
              color="primary"
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
