import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./AuthScreens/LoginScreen";
import StartScreen from "./StartScreen";
import VerifyOTPScreen from "./AuthScreens/VerifyOTPScreen";
import RegisterScreen from "./AuthScreens/RegisterScreen";
import AppStack from "./AppStack";
import EnterDetailsScreen from "./EnterDetailsScreen";
import NewRequest from "./NewRequest";

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Start" component={StartScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="OTPScreen" component={VerifyOTPScreen} />
      <Auth.Screen
        name="AppStack"
        component={AppStack}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="Details"
        component={EnterDetailsScreen}
        options={{ headerShown: true }}
      />
      <Auth.Screen
        name="NewRequest"
        component={NewRequest}
        options={{
          headerShown: true,
          headerTitle: "Make New Request",
        }}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
