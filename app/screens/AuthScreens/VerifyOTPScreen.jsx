import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Screen from "../../components/Screen";
import Title from "../../components/Title";
import Colors from "../../config/colors";
import CustomTextInput from "../../components/CustomTextInput";

const VerifyOTPScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Screen color={Colors.white}>
      <Title size={28}>Verify Number</Title>
      <View style={{ flexDirection: "row" }}>
        <CustomTextInput placeholder={"+91"} />
        <CustomTextInput placeholder={"Enter your phone number here"} />
      </View>
      <StyledButton title="Send OTP" />
      <Button
        title="Fill in details"
        onPress={() => navigation.navigate("Details")}
      />
    </Screen>
  );
};

export default VerifyOTPScreen;

const StyledButton = ({ title, onPress }) => {
  return (
    <LinearGradient
      colors={["#ff217a", "#ff4d4d"]}
      style={{
        borderRadius: 28,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          padding: 16,
          paddingHorizontal: 32,
          borderRadius: 28,
          alignItems: "center",
        }}
        onPress={() => null}
      >
        <Title size={20} color={Colors.white}>
          {title}
        </Title>
      </TouchableOpacity>
    </LinearGradient>
  );
};
