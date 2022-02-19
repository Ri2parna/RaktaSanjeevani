import React from "react";
import { View } from "react-native";
import Colors from "../config/colors";

export const SimpleCard = ({ children, style, row, full, flexStart }) => {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.purewhite,
          padding: 8,
          borderRadius: 8,
          margin: 4,
          flexDirection: row && "row",
          alignItems: "center",
          justifyContent: row && "space-between",
          justifyContent: (flexStart && "flex-start") || "space-between",
          flexWrap: "wrap",
          flex: full ? 1 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
