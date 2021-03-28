import React, { Children } from "react";
import { View, Text } from "react-native";

const Title = ({ children, color, padding = 0, size, ...props }) => {
  return (
    <Text
      style={{
        color: color || "black",
        fontWeight: "bold",
        fontSize: size || 16,
        padding: padding,
      }}
    >
      {children}
    </Text>
  );
};

export default Title;
