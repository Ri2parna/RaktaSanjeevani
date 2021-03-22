import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import LoginScreen from "./AuthScreens/LoginScreen";

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Login" component={LoginScreen} />
    </Auth.Navigator>
  );
};

export default AuthStack;
