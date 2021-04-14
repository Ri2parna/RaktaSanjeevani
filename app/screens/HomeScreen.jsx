import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Colors from "../config/colors";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "../components/CustomButton";

import { api } from "../config/endpoints";
import { getData } from "../utils/asyncStorage";

// Here location object refers to the co-ordinates
// cityName refers to the location

const HomeScreen = ({ navigation, route }) => {
  // some variable could be changed to useRef here
  const [donorCount, setDonorCount] = useState(0);
  const [cityName, setCityName] = useState(null);
  const [location, setLocation] = useState({
    latitude: 26.6998045, // default location is set to Patkai
    longitude: 92.8358069,
  });
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);
  const [requestCount, setRequestCount] = useState(0);
  const [uid, setUid] = useState(null);

  const convertToDistrict = async () => {
    // Geocoding URL Links
    // "http://api.positionstack.com/v1/reverse?access_key=943f706d873bce76d1de51755967d504&query=" +
    // `${location.coords.latitude},${location.coords.longitude}`,

    // "http://api.positionstack.com/v1/reverse?access_key=943f706d873bce76d1de51755967d504&query=26.6998045,92.8358069"
    axios
      .get("http://api.positionstack.com/v1/reverse", {
        params: {
          access_key: "943f706d873bce76d1de51755967d504",
          query: `${location.latitude},${location.longitude}`,
        },
      })
      .then(({ data }) => setCityName(data.data[0].county));
  };
  const storeCurrentLocation = async () => {
    setCityName(null);
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});

    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  // prevents moving back to the login screen after succesful login
  useEffect(() =>
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  );
  useEffect(() => {
    getData("uid");
    storeCurrentLocation().then(() => convertToDistrict());
  }, []);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <LinearGradient
        colors={["#ff4d4d", "#ff217a"]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={styles.cta}>
          <View style={{ alignItems: "center" }}>
            <Title color={Colors.white} size={24}>
              {donorCount}
            </Title>
            <SubTitle color={Colors.white}>Donors</SubTitle>
          </View>
          <CustomButton
            title="Find Donors"
            onPress={() => navigation.navigate("MakeRequests")}
          />
        </View>
        <View style={styles.cta}>
          <View style={{ alignItems: "center" }}>
            <Title color={Colors.white} size={24}>
              {requestCount}
            </Title>
            <SubTitle color={Colors.white}>Requests</SubTitle>
          </View>
          <CustomButton
            title="See Requests"
            onPress={() => navigation.navigate("ViewRequests")}
          />
        </View>
      </LinearGradient>
      <View style={{ flex: 2, backgroundColor: "pink" }}>
        <View
          style={{
            flexDirection: "row",
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title>Current Location: </Title>
          {cityName ? (
            <>
              <Text
                style={{
                  marginRight: 8,
                  color: Colors["grey-6"],
                  fontWeight: "bold",
                }}
              >
                {cityName}
              </Text>
            </>
          ) : (
            <ActivityIndicator
              size={32}
              color={Colors["grey-8"]}
              style={{ width: "12%" }}
            />
          )}
          <CustomButton
            title="Update Location"
            textSize={14}
            onPress={() => {
              storeCurrentLocation().then(() => convertToDistrict());
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  locationCard: {
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
  cta: {
    margin: 8,
    width: "86%",
    flex: 1,
    padding: 8,
    backgroundColor: `rgba(255,255,255,.24)`,
    flexDirection: "row",
    borderRadius: 4,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
