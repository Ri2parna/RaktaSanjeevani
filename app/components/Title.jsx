import React, { Children } from "react";
import { View, Text } from "react-native";

const Title = ({ children, ...props }) => {
  return <Text style={{ fontWeight: "bold", fontSize: 16 }}>{children}</Text>;
};

export default Title;
