import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home";
import ReviewDetail from "../views/ReviewDetail";
import ApartmentDetail from "../views/ApartmentDetail";

const Stack = createNativeStackNavigator();

export default function HomeStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#eee" } }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Apartment Home",
        }}
      />
      <Stack.Screen
        name="ApartmentDetail"
        component={ApartmentDetail}
        options={{ title: "Apartment Detail" }}
      />
    </Stack.Navigator>
  );
}
