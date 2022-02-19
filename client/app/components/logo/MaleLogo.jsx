import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Colors } from "../../config";
import WhiteMaleLogo from "../../assets/maleUserWhite.svg";
import DarkMaleLogo from "../../assets/maleUserDark.svg";

export const MaleLogo = ({ selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonOutline, styles.shadow, { margin: 8 }]}
    >
      <LinearGradient
        colors={
          selected ? ["#ff217a", "#ff4d4d"] : [Colors.white, Colors.white]
        }
        style={[styles.buttonOutline, styles.shadow, { padding: 24 }]}
      >
        {selected ? (
          <WhiteMaleLogo height={40} width={40} />
        ) : (
          <DarkMaleLogo height={40} width={40} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  buttonOutline: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
  },
});
