import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const CustomTextInput = ({ placeholder, padding, width, margin }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#a2a2a2"
      style={[
        styles.shadow,
        {
          backgroundColor: `#f6f6f6`,
          padding: padding || 8,
          paddingHorizontal: 24,
          marginRight: 8,
          borderRadius: 816,
          width: width,
          margin: margin,
        },
      ]}
    />
  );
};
export default CustomTextInput;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
