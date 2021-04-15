import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppStack from "./app/screens/AppStack";
import AuthStack from "./app/screens/AuthStack";

import UserContext from "./app/hooks/userContext";
import { getData } from "./app/utils/asyncStorage";

export default function App() {
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: 26.6998045, // default location is set to Patkai
    longitude: 92.8358069,
  });
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    getData("uid")
      .then((uid) => setUid(uid))
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <UserContext.Provider
        value={{ uid, location, cityName, setUid, setLocation, setCityName }}
      >
        <NavigationContainer>
          {uid ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}
