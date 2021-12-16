import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "../views/About";
import ReviewDetail from "../views/ReviewDetail";

const Stack = createNativeStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#eee" } }}
    >
      <Stack.Screen
        name="About"
        component={About}
        options={{ title: "Manage List" }}
      />
      <Stack.Screen
        name="ReviewDetail"
        component={ReviewDetail}
        options={{ title: "Manage Detail" }}
      />
    </Stack.Navigator>
  );
}
