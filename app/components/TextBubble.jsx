import React from "react";
import Title from "../components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../config/colors";
import { StyleSheet } from "react-native";

export const TextBubble = ({ placeholder, selected, padding, margin }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 80,
        padding: 2,
        margin: margin,
      }}
    >
      <LinearGradient
        colors={
          selected ? ["#ff217a", "#ff4d4d"] : [Colors.white, Colors.white]
        }
        style={[
          {
            borderRadius: 80,
            padding: padding,
          },
          styles.shadow,
        ]}
      >
        <Title size={20} color={selected ? Colors.white : "black"}>
          {placeholder}
        </Title>
      </LinearGradient>
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
