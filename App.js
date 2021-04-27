import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppStack from "./app/screens/AppStack";
import AuthStack from "./app/screens/AuthStack";

import UserContext from "./app/hooks/userContext";
import { getData, storeData, removeData } from "./app/utils/asyncStorage";

export default function App() {
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: 26.6998045, // default location is set to Patkai
    longitude: 92.8358069,
  });
  const [cityName, setCityName] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [phone, setPhone] = useState();

  useEffect(() => {
    getData("isSignedIn")
      .then((result) => {
        if (typeof result == "boolean" && result == false) {
          console.log(`boolean mila, wobhi false wala`, typeof result);
        } else {
          console.log(`data me ${result} mila`);
          console.log("user signed in hai, janneka de re baba");
          getData("uid").then((uid) => {
            setUid(uid);
            setIsSignedIn(true);
            console.log(`Uid ${uid} obtained from storage`);
          });
        }
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <UserContext.Provider
        value={{
          uid,
          location,
          cityName,
          setUid,
          setLocation,
          phone,
          setPhone,
          setCityName,
        }}
      >
        <NavigationContainer>
          {isSignedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}
