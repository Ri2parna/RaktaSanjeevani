import React from "react";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import Screen from "../../components/Screen";
import { api } from "../../config/endpoints";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = useState("noDatayet");
  function fetchData() {
    console.log("clicked button");
    api
      .get("/registration", { phone: "99997229" })
      .then((data) => console.log(data));
  }
  return (
    <Screen>
      <Text>{JSON.stringify(data)}</Text>
      <Button title="Play Fetch" onPress={() => fetchData()} />
    </Screen>
  );
};

export default LoginScreen;
