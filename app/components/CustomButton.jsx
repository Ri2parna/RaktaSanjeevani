import React from "react";
import Colors from "../config/colors";
import Title from "../components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CustomButton = ({
  title = "Placeholder",
  margin,
  padding,
  color,
  onPress,
  icon,
  iconColor,
  textSize,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          padding: padding || 8,
          paddingHorizontal: 16,
          borderRadius: 24,
          backgroundColor: Colors.white,
          flexDirection: "row",
          justifyContent: icon ? "space-between" : "center",
          alignItems: "center",
          margin: margin,
        },
        styles.shadow,
      ]}
      onPress={onPress}
    >
      {icon ? (
        <Ionicons
          name="add-circle-outline"
          size={24}
          color={iconColor || "black"}
        />
      ) : null}
      <Title color={color || Colors.blood} size={textSize || 20} center>
        {title}
      </Title>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
});
