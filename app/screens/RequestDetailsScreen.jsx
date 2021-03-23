import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";

const RequestDetailsScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>Request Details</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </Screen>
  );
};

export default RequestDetailsScreen;
