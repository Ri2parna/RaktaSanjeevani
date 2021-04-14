import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./app/screens/AppStack";
import AuthStack from "./app/screens/AuthStack";
import LoginScreen from "./app/screens/AuthScreens/LoginScreen";

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {LoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
