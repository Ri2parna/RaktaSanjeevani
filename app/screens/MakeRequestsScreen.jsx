import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";

const MakeRequestsScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>Make Requests Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </Screen>
  );
};

export default MakeRequestsScreen;