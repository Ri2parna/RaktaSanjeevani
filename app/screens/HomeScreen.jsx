import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";
import { getData } from "../utils/asyncStorage";

// Here location object refers to the co-ordinates
// cityName refers to the location

const HomeScreen = ({ navigation, route }) => {
  // some variable could be changed to useRef here
  const [donorCount, setDonorCount] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);
  const [requestCount, setRequestCount] = useState(null);
  const { uid, location, cityName, setCityName, setLocation } = useContext(
    UserContext
  );

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
      .then(({ data }) => {
        let city = `${data.data[0].county}`.toLowerCase();
        setCityName(city);
      });
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
    // update location on server
    api.post("/user", { uid, currentLocation: cityName }).then((response) => {
      if (response.problem) {
        console.warn("Houston, we have a problem with updating location");
      }
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
    api.get("/donorcount").then(({ data }) => setDonorCount(data.count));
    api.get("/requestcount").then(({ data }) => setRequestCount(data.count));
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
              {donorCount == null ? (
                <ActivityIndicator size={32} color={Colors["grey-8"]} />
              ) : (
                donorCount
              )}
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
              {requestCount == null ? (
                <ActivityIndicator size={32} color={Colors["grey-8"]} />
              ) : (
                requestCount
              )}
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
