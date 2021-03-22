import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const Screen = ({ children, ...props }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});

export default Screen;
