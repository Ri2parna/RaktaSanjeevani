// This will display profile details about the registered user
import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";

const ProfileScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>ProfileScreen</Text>
      <Button title="Go Next" />
      <Button
        title="Upload ID"
        onPress={() => navigation.navigate("UploadID")}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </Screen>
  );
};

export default ProfileScreen;
