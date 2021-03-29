import React, { Children } from "react";
import { View, Text } from "react-native";

const Title = ({ children, color, center, paddingV = 0, size, ...props }) => {
  return (
    <Text
      style={{
        color: color || "black",
        fontWeight: "bold",
        fontSize: size || 16,
        paddingVertical: paddingV,
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
};

export default Title;
