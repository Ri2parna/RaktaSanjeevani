import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";

const UploadIDScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>Upload ID Screen</Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </Screen>
  );
};

export default UploadIDScreen;
