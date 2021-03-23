import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../../components/Screen";

const LoginScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>LoginScreen</Text>
      <Button
        title="Go to Verify OTP"
        onPress={() => navigation.navigate("OTPScreen")}
      />
    </Screen>
  );
};

export default LoginScreen;
