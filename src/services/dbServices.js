import * as SQLite from "expo-sqlite";
import { openDatabase as openDatabaseSqliteStorage } from "react-native-sqlite-storage";

export function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}
