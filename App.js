import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./app/screens/AppStack";
import AuthStack from "./app/screens/AuthStack";

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {LoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
