import React, { useContext, useState } from "react";
import { Text, Button } from "react-native";
import Screen from "../../components/Screen";
import { api } from "../../config/endpoints";
import UserContext from "../../hooks/userContext";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [phone, setPhone] = useState("99997229");
  const { uid, setUid } = useContext(UserContext);

  async function fetchData() {
    api.get("/registration", { phone }).then(({ data }) => setData(data));
  }
  return (
    <Screen>
      <Text>{JSON.stringify(data)}</Text>
      <Button
        title="Go to register"
        onPress={() => {
          fetchData().then((data) => {
            if (data) {
              navigation.navigate("AppStack");
            } else {
              navigation.navigate("Register");
            }
          });
        }}
      />
    </Screen>
  );
};

export default LoginScreen;
