// This will display profile details about the registered user
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";

import SubTitle from "../components/SubTitle";
import { TextBubble } from "../components/TextBubble";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";

import { SimpleCard } from "../components/SimpleCard";
import { UserCard } from "../components/UserCard";

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDonated, setLastDonated] = useState("Loading...");
  // created requests
  const [createdRequests, SetCreatedRequests] = useState([]);
  // acceptedRequests
  const [acceptedRequests, setAcceptedrequests] = useState([]);
  // completedRequests
  const [completedRequests, setCompletedRequests] = useState([]);
  // rejected requests ==> incompleteRequests
  const [rejectedRequests, setRejectedRequests] = useState([]);

  let { uid } = route.params;
  useEffect(() => {
    api
      .get("/user", { uid })
      .then((response) => {
        if (response.ok) {
          if (response.data?.lastDonated == null) {
            setLastDonated("User hasn't donated blood before");
          } else {
            setLastDonated(moment(response.data.lastDonated).toNow());
          }

          setUserData(response.data);
          SetCreatedRequests(response.data.createdRequests);
          setAcceptedrequests(response.data.acceptedRequests);
          setCompletedRequests(response.data.completedRequests);
          setRejectedRequests(response.data.rejectedRequests);
        } else {
          console.warn("Houston, we might have an internet problem");
        }
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;
  else {
    return (
      <View style={[styles.screen, { padding: 8 }]}>
        <UserCard {...userData} />
        <Title>Last Donated on: </Title>
        <Container style={[styles.center, { padding: 16, flex: 1 }]}>
          <SubTitle>{lastDonated}</SubTitle>
        </Container>
        <Title>Created Requests: </Title>
        <FlatList
          data={createdRequests}
          keyExtractor={(item, index) => item._id}
          renderItem={(item) => (
            <SimpleCard row>
              <TextBubble
                placeholder={item.item.bloodType}
                padding={8}
                selected
              />
              <View style={{ flex: 1, padding: 4 }}>
                <Text>{item.item.patientName}</Text>
                <Text>{item.item.hospital}</Text>
                <Text>{`Units required:  ${item.item.units}`}</Text>
                <Title>{`Valid till: ${moment(
                  item.item.validity
                ).calendar()}`}</Title>
              </View>
            </SimpleCard>
          )}
          ListEmptyComponent={EmptyComponent}
        />
        <Title>Accepted Requests: </Title>
        <FlatList
          data={acceptedRequests}
          keyExtractor={(item, index) => item._id}
          style={{ minHeight: 120 }}
          renderItem={(item) => (
            <SimpleCard row>
              <TextBubble
                placeholder={item.item.bloodType}
                padding={8}
                selected
              />
              <View style={{ flex: 1, padding: 4 }}>
                <Text>{item.item.patientName}</Text>
                <Text>{item.item.hospital}</Text>
                <Text>{`Units required:  ${item.item.units}`}</Text>
              </View>
            </SimpleCard>
          )}
          ListEmptyComponent={EmptyComponent}
        />
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
const EmptyComponent = () => {
  return (
    <SimpleCard>
      <Text>No data available</Text>
    </SimpleCard>
  );
};

const LoadingScreen = () => {
  return (
    <View style={[styles.screen, styles.center]}>
      <ActivityIndicator color={Colors.success} size={60} />
    </View>
  );
};
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
