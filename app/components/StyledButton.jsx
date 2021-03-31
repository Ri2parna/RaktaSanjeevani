import React from "react";
import Title from "./Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../config/colors";

export const StyledButton = ({ margin, navigation, title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 28,
        alignItems: "center",
        backgroundColor: "red",
        width: "100%",
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#ff217a", "#ff4d4d"]}
        style={{
          borderRadius: 28,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Title size={20} color={Colors.white} paddingV={20}>
          {title}
        </Title>
      </LinearGradient>
    </TouchableOpacity>
  );
};
