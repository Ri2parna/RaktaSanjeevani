import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";

const StartScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>StartScreen</Text>
      <View style={styles.flexRow}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </Screen>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
