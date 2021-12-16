import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStack from "./HomeStack";
import AboutStack from "./AboutStack";

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator({ navigation }) {
  const [run, setRun] = React.useState(0);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ navigation }) => {
          return {
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          };
        }}
        listeners={(e) => {
          e.preventDefault;
        }}
      />
      <Tab.Screen
        name="AboutStack"
        component={AboutStack}
        options={{
          title: "List",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
