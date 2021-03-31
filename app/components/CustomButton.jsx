import React from "react";
import Colors from "../config/colors";
import Title from "../components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CustomButton = ({
  title = "Placeholder",
  onPress,
  icon,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          padding: 8,
          paddingHorizontal: 16,
          borderRadius: 24,
          backgroundColor: Colors.white,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
      <Title color={Colors.blood} size={20}>
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
