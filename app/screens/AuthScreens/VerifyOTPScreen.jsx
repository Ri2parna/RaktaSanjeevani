import React, { useState } from "react";
import { View } from "react-native";
import Screen from "../../components/Screen";
import Title from "../../components/Title";
import Colors from "../../config/colors";
import CustomTextInput from "../../components/CustomTextInput";
import { GradientButton } from "../../components/GradientButton";

const VerifyOTPScreen = ({ navigation }) => {
  return (
    <Screen color={Colors.white}>
      <Title size={28}>Verify Number</Title>
      <View style={{ flexDirection: "row" }}>
        <CustomTextInput placeholder={"+91"} />
        <CustomTextInput placeholder={"Enter your phone number here"} />
      </View>
      <GradientButton
        title="Send OTP"
        paddingV={12}
        paddingH={32}
        onPress={() => navigation.navigate("Details")}
      />
    </Screen>
  );
};

export default VerifyOTPScreen;
