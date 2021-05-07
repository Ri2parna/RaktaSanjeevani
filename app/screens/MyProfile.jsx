// This will display profile details about the registered user
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  BackHandler,
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
import * as Linking from "expo-linking";
import { UserCard } from "../components/UserCard";

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

  const rejectRequest = (rid) => {
    api.post("/rejectrequest", {
      acceptedby: uid,
      rid,
    });
  };
  useEffect(() => {
    api
      .get("/user", { uid })
      .then((response) => {
        if (response.ok) {
          setUserData(response.data);
          SetCreatedRequests(response.data.createdRequests);
          setAcceptedrequests(response.data.acceptedRequests);
          setCompletedRequests(response.data.completedRequests);
          setRejectedRequests(response.data.rejectedRequests);
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
        <UserCard {...userData} />
        <Title>Last Donated on: </Title>
        <SimpleCard style={[styles.center]}>
          <SubTitle>{lastDonated}</SubTitle>
        </SimpleCard>
        <Title>Accepted Requests: </Title>
        <FlatList
          data={acceptedRequests}
          keyExtractor={(item, index) => item._id}
          style={{ minHeight: "22%" }}
          renderItem={(item) =>
            AcceptedRequestCard(item, userData, rejectRequest)
          }
          ListEmptyComponent={() => EmptyContainer}
        />
        <Title>Created Requests: </Title>
        <FlatList
          data={createdRequests}
          keyExtractor={(item, index) => item._id}
          renderItem={(item) => <CreatedRequestCard {...item} />}
          ListEmptyComponent={() => EmptyContainer}
        />

        <SignOutButton />
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

const EmptyContainer = (
  <SimpleCard>
    <Text>User hasn't created any requests in the past</Text>
  </SimpleCard>
);

const CreatedRequestCard = ({
  index,
  item: { _id, bloodType, patientName, hospital, units, validity },
}) => {
  const deleteRequest = () => {
    api
      .delete("/request", { rid: _id })
      .then((response) => {
        if (response.ok) {
          alert("Request deleted succesfullly");
        } else {
          alert("Error deleting request");
        }
      })
      .catch((err) => console.log("failed to delete request", err));
  };
  return (
    <SimpleCard row>
      <TextBubble placeholder={bloodType} padding={8} selected />
      <View style={{ flex: 1, padding: 4 }}>
        <Text>{patientName}</Text>
        <Text>{hospital}</Text>
        <Text>{`Units required:  ${units}`}</Text>
        <Text>{`Valid till: ${moment(validity).calendar()}`}</Text>
      </View>
      <SimpleCard>
        <CustomButton
          title="Delete"
          titleColor={Colors.purewhite}
          color={Colors.blood}
          margin={3}
          padding={1}
          onPress={() => {
            deleteRequest(_id);
          }}
        />
      </SimpleCard>
    </SimpleCard>
  );
};

function SignOutButton() {
  const { setUid } = useContext(UserContext);
  return (
    <CustomButton
      title="SignOut"
      color={Colors.bloodRed}
      titleColor={Colors.purewhite}
      margin={8}
      onPress={() => {
        removeData("uid").then(() => {
          setUid(null);
        });
        removeData("isSignedIn").then(
          Alert.alert("Succesfully logged out", "press OK to close the app", [
            { text: "YES", onPress: () => BackHandler.exitApp() },
          ])
        );
      }}
    />
  );
}

function AcceptedRequestCard(item, userData, rejectRequest) {
  return (
    <SimpleCard row>
      <TextBubble placeholder={item.item.bloodType} padding={8} selected />
      <View style={{ flex: 1, padding: 4 }}>
        <Text>{item.item.patientName}</Text>
        <Text>{item.item.hospital}</Text>
        <Text>{`Units required:  ${item.item.units}`}</Text>
      </View>
      <SimpleCard>
        <CustomButton
          title="Call"
          margin={3}
          padding={1}
          onPress={() => {
            Linking.openURL(`tel://${userData.phone}`);
          }}
        />
        <CustomButton
          title="Reject"
          titleColor={Colors.purewhite}
          color={Colors.blood}
          margin={3}
          padding={1}
          onPress={() => rejectRequest(item.item._id)}
        />
      </SimpleCard>
    </SimpleCard>
  );
}
