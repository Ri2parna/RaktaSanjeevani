import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../../components/Screen";

const VerifyOTPScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>Verify OTP Here</Text>
      <Button
        title="AppStack Home"
        onPress={() => navigation.navigate("AppStack")}
      />
    </Screen>
  );
};

export default VerifyOTPScreen;
