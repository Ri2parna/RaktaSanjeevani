import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../config/colors";

const CustomTextInput = ({
  style,
  placeholder,
  padding,
  width,
  margin,
  autoFocus,
  autoCompleteType,
  keyboardType,
  textContentType,
  editable,
  marginVertical,
  onChangeText,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      autoFocus={autoFocus}
      autoCompleteType={autoCompleteType}
      keyboardType={keyboardType}
      textContentType={textContentType}
      editable={editable}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor || Colors["grey-4"]}
      style={[
        styles.shadow,
        {
          backgroundColor: `#f6f6f6`,
          padding: padding || 8,
          paddingHorizontal: 24,
          borderRadius: 80,
          width: width,
          margin: margin,
          marginVertical: marginVertical,
        },
        style,
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
    shadowOpacity: 0.4,
    shadowRadius: 1.6,
    elevation: 4,
  },
});
