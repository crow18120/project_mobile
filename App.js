import React from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import BottomTabsNavigator from "./src/routes/BottomTabsNavigator";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { openDatabase } from "./src/services/dbServices";
import { LogBox } from "react-native";

// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const db = openDatabase();

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists reviews (id integer primary key not null, title text, body text, rating int);"
        // "CREATE TABLE IF NOT EXISTS reviews(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), rating INT(10), body VARCHAR(255))"
      );
      tx.executeSql(
        "create table if not exists apartment (id integer primary key not null, property text, bedrooms text, money int, furniture text, note text, reporter text, date text);"
      );
      tx.executeSql(
        "create table if not exists note (id integer primary key not null, apartment int, title text, info text);"
      );
    });
  }, []);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    );
  }
  return (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
  );
}
