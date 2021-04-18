// This will display profile details about the registered user
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import SubTitle from "../components/SubTitle";
import { TextBubble } from "../components/TextBubble";
import { CustomButton } from "../components/CustomButton";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";
import { removeData } from "../utils/asyncStorage";
import { SimpleCard } from "../components/SimpleCard";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";

const MyProfile = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDonated, setLastDonated] = useState("User hasn't dontated before");
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
          response.data?.lastDonated
            ? setLastDonated(moment(response.data.lastDonated).toNow())
            : null;
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
        <SimpleCard style={[styles.center]}>
          <SubTitle>{lastDonated}</SubTitle>
        </SimpleCard>
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
                <Text>{`Valid till: ${moment(
                  item.item.validity
                ).calendar()}`}</Text>
              </View>
            </SimpleCard>
          )}
          ListEmptyComponent={() => (
            <SimpleCard>
              <Text>User hasn't created any requests in the past</Text>
            </SimpleCard>
          )}
        />
        <Title>Accepted Requests: </Title>
        <FlatList
          data={acceptedRequests}
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
              </View>
            </SimpleCard>
          )}
          ListEmptyComponent={() => (
            <SimpleCard>
              <Text>User hasn't created any requests in the past</Text>
            </SimpleCard>
          )}
        />
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
