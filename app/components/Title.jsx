import React, { Children } from "react";
import { View, Text } from "react-native";

const Title = ({
  margin,
  children,
  color,
  center,
  padding,
  paddingV = 0,
  marginTop = 0,
  size,
  ...props
}) => {
  return (
    <Text
      style={{
        color: color || "black",
        fontWeight: "bold",
        fontSize: size || 16,
        paddingVertical: paddingV,
        textAlign: center && "center",
        padding: padding,
        flexWrap: "wrap",
        margin: margin,
        marginTop: marginTop,
      }}
    >
      {children}
    </Text>
  );
};

export default Title;
