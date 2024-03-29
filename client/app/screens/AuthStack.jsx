import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./StartScreen";
import VerifyOTPScreen from "./AuthScreens/VerifyOTPScreen";
import RegisterScreen from "./AuthScreens/RegisterScreen";
import AppStack from "./AppStack";

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Start"}
    >
      <Auth.Screen name="Start" component={StartScreen} />
      <Auth.Screen name="Login" component={VerifyOTPScreen} />
      <Auth.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true }}
      />
      <Auth.Screen name="AppStack" component={AppStack} />
    </Auth.Navigator>
  );
};

export default AuthStack;
