import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const Screen = ({ children, color, ...props }) => {
  return (
    <View
      style={[styles.container, { backgroundColor: color || "powderblue" }]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: Dimensions.get("window").height + 48, // 48 is added to padd the bottom soft navigation
    width: Dimensions.get("window").width,
  },
});

export default Screen;