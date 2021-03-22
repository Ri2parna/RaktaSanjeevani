import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Screen from "./app/components/Screen";
import HomeScreen from "./app/screens/HomeScreen";
import StartScreen from "./app/screens/StartScreen";
import AppStack from "./app/screens/AppStack";
import AuthStack from "./app/screens/AuthStack";

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(null);
  return (
    <NavigationContainer>
      {LoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
