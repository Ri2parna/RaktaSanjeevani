import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import MakeRequestsScreen from "./MakeRequestsScreen";
import ViewRequestsScreen from "./ViewRequestsScreen";
import RequestDetailsScreen from "./RequestDetailsScreen";
import NewRequest from "./NewRequest";
import Colors from "../config/colors";
import MyProfile from "./MyProfile";
import { Image, View } from "react-native";
import Title from "../components/Title";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#ff4d4d", elevation: 0 },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: null,
          headerTitle: (props) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/sanjeevaniLogo.png")}
                style={{ height: 32, width: 32, marginRight: 8 }}
              />
              <Title size={22} color={Colors.purewhite}>
                RaktaSanjeevani
              </Title>
            </View>
          ),
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="MakeRequests"
        component={MakeRequestsScreen}
        options={{
          headerTitle: "Request for blood",
        }}
      />
      <Stack.Screen
        name="NewRequest"
        component={NewRequest}
        options={{
          headerTitle: "New Blood request",
        }}
      />
      <Stack.Screen name="ViewRequests" component={ViewRequestsScreen} />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetailsScreen}
        options={{
          headerTitle: "Request Details",
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerTitle: "Your Profile Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
