import React from "react";
import Title from "./Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../config/colors";

export const GradientButton = ({
  radius,
  margin,
  paddingV,
  paddingH,
  navigation,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: radius || 28,
        alignItems: "center",
        backgroundColor: "red",
        width: "100%",
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#ff217a", "#ff4d4d"]}
        style={{
          borderRadius: radius || 28,
          alignItems: "center",
          width: "100%",
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
        }}
      >
        <Title size={16} color={Colors.white}>
          {title}
        </Title>
      </LinearGradient>
    </TouchableOpacity>
  );
};
