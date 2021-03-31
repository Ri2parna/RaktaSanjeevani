import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";

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
    height: Dimensions.get("window").height, // 48 is added to padd the bottom soft navigation
    width: Dimensions.get("window").width,
    height: "100%",
    // paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});

export default Screen;
