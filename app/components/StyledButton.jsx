import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "react-native-svg";
import Colors from "../config/colors";
import Title from "./Title";

const StyledButton = ({ title, navigation, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        paddingHorizontal: 32,
        borderRadius: 28,
        alignItems: "center",
      }}
      onPress={() => setModalVisible(true)}
    >
      <Title size={20} color={Colors.white}>
        {title}
      </Title>
    </TouchableOpacity>
  );
};
export default StyledButton;

const styles = StyleSheet.create({});
