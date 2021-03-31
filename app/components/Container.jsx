import React from "react";
import { View } from "react-native";

export const Container = ({ children, row, column, ...props }) => {
  return (
    <View
      style={{
        padding: 8,
        width: "100%",
        flexDirection: (row && "row") || (column && "column"),
        flexWrap: "wrap",
      }}
    >
      {children}
    </View>
  );
};
