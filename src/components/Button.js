import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function FlatButton({ text, onPress, color, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContent}>
      <View style={{ ...styles.button, ...styles[color], ...style }}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 16,
  },
  primary: {
    backgroundColor: "#3f50b5",
  },
  secondary: {
    backgroundColor: "#f44336",
  },
});
