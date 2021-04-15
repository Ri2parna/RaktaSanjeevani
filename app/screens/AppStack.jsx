import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import UploadIDScreen from "./UploadIDScreen";
import MakeRequestsScreen from "./MakeRequestsScreen";
import ViewRequestsScreen from "./ViewRequestsScreen";
import RequestDetailsScreen from "./RequestDetailsScreen";
import NewRequest from "./NewRequest";
import Colors from "../config/colors";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: "#ff4d4d", elevation: 0 },
          headerTintColor: Colors.white,
          headerLeft: null,
          headerTitle: "RaktaSanjeevani",
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UploadID" component={UploadIDScreen} />
      <Stack.Screen
        name="MakeRequests"
        component={MakeRequestsScreen}
        options={{
          headerStyle: { backgroundColor: "#ff4d4d", elevation: 0 },
          headerTintColor: Colors.white,
          headerTitle: "Request for blood",
        }}
      />
      <Stack.Screen
        name="NewRequest"
        component={NewRequest}
        options={{
          headerStyle: { backgroundColor: "#ff4d4d", elevation: 0 },
          headerTintColor: Colors.white,
          headerTitle: "New Blood request",
        }}
      />
      <Stack.Screen name="ViewRequests" component={ViewRequestsScreen} />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetailsScreen}
        options={{
          // headerStyle: { backgroundColor: "#ff4d4d", elevation: 0 },
          // headerTintColor: Colors.white,
          headerTitle: "Request Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
