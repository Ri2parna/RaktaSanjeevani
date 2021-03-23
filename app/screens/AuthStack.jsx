import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./AuthScreens/LoginScreen";
import StartScreen from "./StartScreen";
import VerifyOTPScreen from "./AuthScreens/VerifyOTPScreen";
import RegisterScreen from "./AuthScreens/RegisterScreen";
import AppStack from "./AppStack";

const Auth = createStackNavigator();

const AuthStack = ({ navigation }) => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Start" component={StartScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="OTPScreen" component={VerifyOTPScreen} />
      <Auth.Screen
        name="AppStack"
        component={AppStack}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
