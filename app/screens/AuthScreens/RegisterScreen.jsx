import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../../components/Screen";

const RegisterScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>Register Here</Text>
      <Button
        title="Verify OTP Next"
        onPress={() => navigation.navigate("OTPScreen")}
      />
    </Screen>
  );
};

export default RegisterScreen;
