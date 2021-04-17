// This will display profile details about the registered user
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import SubTitle from "../components/SubTitle";
import { TextBubble } from "../components/TextBubble";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDonated, setLastDonated] = useState("Loading...");
  let { uid } = route.params;
  useEffect(() => {
    api
      .get("/user", { uid })
      .then((response) => {
        if (response.ok) {
          if (response.data?.lastDonated == null) {
            setLastDonated("Use hasn't donated blood before");
          } else {
            setLastDonated(moment(response.data.lastDonated).toNow());
          }
          setUserData(response.data);
        } else {
          console.warn("Houston, we might have an internet problem");
        }
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color={Colors.success} size={60} />
      </View>
    );
  } else {
    return (
      <View style={[styles.screen, { padding: 8 }]}>
        <Container row>
          <TextBubble
            placeholder={userData?.bloodType}
            padding={16}
            margin={12}
            selected
          />
          <View>
            <Title>{userData.name}</Title>
            <SubTitle>{userData.currentLocation}</SubTitle>
            <SubTitle>{`Verification Status: ${
              userData.verified ? "verified" : "Not Verified"
            }`}</SubTitle>
          </View>
        </Container>
        <Title>Last Donated on: </Title>
        <Container style={[{ flex: 1 }, styles.center]}>
          <SubTitle>{lastDonated}</SubTitle>
        </Container>
        <Title>Created Requests: </Title>
        <Container style={[{ flex: 1 }, styles.center]}>
          <SubTitle>Requests created in the past</SubTitle>
        </Container>
        <Title>Accepted Requests: </Title>
        <Container style={[{ flex: 1 }, styles.center]}>
          <SubTitle>Requests accepted in the past</SubTitle>
        </Container>
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
  },
  center: { alignItems: "center", justifyContent: "center" },
});

const Container = ({ children, style, row }) => {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.purewhite,
          padding: 8,
          borderRadius: 8,
          margin: 4,
          flexDirection: row && "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
