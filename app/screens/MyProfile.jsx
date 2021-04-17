// This will display profile details about the registered user
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import SubTitle from "../components/SubTitle";
import { TextBubble } from "../components/TextBubble";
import { CustomButton } from "../components/CustomButton";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";
import { removeData } from "../utils/asyncStorage";
import { SimpleCard } from "../components/SimpleCard";

const MyProfile = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid, setUid } = useContext(UserContext);
  // created requests
  const [createdRequests, SetCreatedRequests] = useState([]);
  // acceptedRequests
  const [acceptedRequests, setAcceptedrequests] = useState([]);
  // completedRequests
  const [completedRequests, setCompletedRequests] = useState([]);
  // rejected requests ==> incompleteRequests
  const [rejectedRequests, setRejectedRequests] = useState([]);

  useEffect(() => {
    api
      .get("/user", { uid })
      .then((response) => {
        if (response.ok) {
          setUserData(response.data);
          SetCreatedRequests(response.data.createdRequests);
          setAcceptedrequests(response.data.acceptedRequests);
          setCompletedRequests(response.data.completedRequests);
          setRejectedRequests(response.data.incompleteRequests);
        } else {
          console.warn("Houston, we might have an internet problem");
        }
      })
      .then(() => setLoading(false))
      .then(() => console.log(userData));
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
        <SimpleCard row>
          <TextBubble
            placeholder={userData?.bloodType}
            padding={16}
            margin={12}
            selected
          />
          <View style={{ flex: 1 }}>
            <Title>{userData.name}</Title>
            <SubTitle>{userData.currentLocation}</SubTitle>
            <SubTitle>{`Verification Status: ${
              userData.verified ? "verified" : "Not Verified"
            }`}</SubTitle>
          </View>
        </SimpleCard>
        <Title>Last Donated on: </Title>
        <SimpleCard full style={[styles.center]}>
          <SubTitle>use moment js to display .fromnow</SubTitle>
        </SimpleCard>
        <Title>Created Requests: </Title>
        <SimpleCard full style={[styles.center]}>
          <SubTitle>Requests created in the past</SubTitle>
        </SimpleCard>
        <Title>Accepted Requests: </Title>
        <SimpleCard full style={[styles.center]}>
          <SubTitle>Requests accepted in the past</SubTitle>
        </SimpleCard>
        <CustomButton
          title="SignOut"
          color={Colors.blood}
          titleColor={Colors.purewhite}
          margin={8}
          onPress={() => {
            removeData("uid").then(() => {
              setUid(null);
            });
            removeData("isSignedIn");
          }}
        />
      </View>
    );
  }
};

export default MyProfile;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
  },
  center: { alignItems: "center", justifyContent: "center" },
});
