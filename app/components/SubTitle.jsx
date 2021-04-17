import React from "react";
import { View, Text } from "react-native";

const SubTitle = ({ children, padding = 0, size = 14, color, ...props }) => {
  return (
    <Text
      style={{
        fontWeight: "400",
        fontSize: 16,
        padding: padding,
        color: color,
        fontSize: size,
        textTransform: "capitalize",
      }}
    >
      {children}
    </Text>
  );
};

export default SubTitle;
