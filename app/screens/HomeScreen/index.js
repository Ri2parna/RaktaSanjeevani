import axios from "axios";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, RefreshControl, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../config/colors";
import { api } from "../../config/endpoints";
import UserContext from "../../hooks/userContext";
import { removeData } from "../../utils/asyncStorage";
import { CallToAction } from "./CallToAction";
import { UserDetail } from "./UserDetail";
import { sendLocationToServer } from "./serverCalls";

// Here location object refers to the co-ordinates
// cityName refers to the location

const HomeScreen = ({ navigation, route }) => {
  // some variable could be changed to useRef here
  const [donorCount, setDonorCount] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);
  const [requestCount, setRequestCount] = useState(null);
  const [lastDonated, setLastDonated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState();

  const { uid, cityName, setCityName, location, setLocation } = useContext(
    UserContext
  );

  // refresh homescreen
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    api.get("/donorcount").then(({ data }) => setDonorCount(data.count));
    api.get("/requestcount").then(({ data }) => setRequestCount(data.count));
    handleGPSupdate().then(() => setRefreshing(false));
  }, []);

  const checkGPSpermissions = async () => {
    // check if gps is on
    // Location.hasServicesEnabledAsync().then((data) => console.log(data));
    // Location.setGoogleApiKey("AIzaSyBgWw5tA4wsx9sEOEtnRyB3XjJb_w - IOWg");
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };

  const handleGPSupdate = async () => {
    console.log("updating location");
    await checkGPSpermissions();
    let currentLocation = await Location.getCurrentPositionAsync({});
    let geocodeData = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    let cname = geocodeData[0].subregion.toLowerCase();
    setCityName(cname);
    sendLocationToServer(cname, uid, {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  const toggleActiveStatus = () => {
    api
      .patch("/user", { uid, active: userData.active })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!uid) removeData("isSignedIn");
    onRefresh();
  }, []);

  useEffect(() => {
    api.get("/user", { uid }).then((response) => {
      if (response.ok) {
        setUserData(response.data);
        if (response.data?.lastDonated == null) {
          setLastDonated(
            "You haven't donated before, do your part in saving someone's life"
          );
        } else setLastDonated(moment(response.data.lastDonated).toNow());
      } else console.warn("Houston, we have a problem!");
    });
  }, []);

  // prevents moving back to the login screen after succesful login
  useEffect(() =>
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  );
  return (
    <ScrollView
      style={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CallToAction donorCount={donorCount} requestCount={requestCount} />
      <UserDetail
        {...userData}
        updateLocation={handleGPSupdate}
        toggleActiveStatus={toggleActiveStatus}
      />
    </ScrollView>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    minHeight: Dimensions.get("window").height,
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  locationSimpleCard: {
    backgroundColor: Colors.primary,
    flex: 1,
    margin: 24,
    borderRadius: 8,
    padding: 28,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
});
