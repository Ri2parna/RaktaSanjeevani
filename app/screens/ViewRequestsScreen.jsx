import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";

const ViewRequestsScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>View Requests Here</Text>
      <Button
        title="View Request Details"
        onPress={() => navigation.navigate("RequestDetails")}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </Screen>
  );
};

export default ViewRequestsScreen;
