import React from "react";
import { View, Text } from "react-native";

const SubTitle = ({ children, ...props }) => {
  return <Text style={{ fontWeight: "400", fontSize: 16 }}>{children}</Text>;
};

export default SubTitle;
