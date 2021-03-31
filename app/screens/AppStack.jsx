import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import UploadIDScreen from "./UploadIDScreen";
import MakeRequestsScreen from "./MakeRequestsScreen";
import ViewRequestsScreen from "./ViewRequestsScreen";
import RequestDetailsScreen from "./RequestDetailsScreen";
import Colors from "../config/colors";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: Colors.blood, elevation: 0 },
          headerTintColor: Colors.white,
          headerLeft: null,
          headerTitle: "RaktaSanjeevani",
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UploadID" component={UploadIDScreen} />
      <Stack.Screen
        name="MakeRequests"
        component={MakeRequestsScreen}
        options={{
          headerStyle: { backgroundColor: Colors.blood, elevation: 0 },
          headerTintColor: Colors.white,
          headerTitle: "Request for blood",
        }}
      />
      <Stack.Screen name="ViewRequests" component={ViewRequestsScreen} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
