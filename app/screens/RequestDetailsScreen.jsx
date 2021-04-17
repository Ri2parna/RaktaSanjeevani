import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import MapView, { Callout, Marker } from "react-native-maps";

import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";
import { GradientButton } from "../components/GradientButton";
import Colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextBubble } from "../components/TextBubble";
import moment from "moment";
import { CustomButton } from "../components/CustomButton";
import { SimpleCard } from "../components/SimpleCard";

const RequestDetailsScreen = ({ navigation, route }) => {
  const { uid, location } = useContext(UserContext);
  const rid = route.params._id; // the id of each request is returned as _id
  const [requestData, setRequestData] = useState(null);
  const acceptRequest = () => {
    api.post("/acceptrequest", { rid, acceptedBy: uid }).then((response) => {
      if (response.ok) {
        // do something
        alert("Your request has been accepted");
      } else {
        // raise and error
      }
    });
  };
  useEffect(() => {
    api.get("/request", { rid }).then((response) => {
      if (response.ok) {
        setRequestData(response.data);
      }
    });
  }, []);
  return (
    <View style={{ width: "100%", height: "100%", padding: 8 }}>
      <View style={{ flex: 1 }}>
        <Title size={20}>Patient Details</Title>
        <SimpleCard row justifyStart>
          <TextBubble placeholder={"AB-"} selected padding={16} margin={8} />
          <View style={{ flex: 1 }}>
            <Title size={20} color={Colors.blood}>
              {requestData?.patientName}
            </Title>
            <SubTitle>{requestData?.cityName}</SubTitle>
            <SubTitle>{moment(requestData?.createdAt).calendar()}</SubTitle>
            <SubTitle>{`Units required: ${requestData?.units}`}</SubTitle>
          </View>
        </SimpleCard>
        <Title size={20}>Hospital Details</Title>
        <SimpleCard row>
          <SubTitle>{requestData?.hospital}</SubTitle>
          <CustomButton title="Get Directions" />
        </SimpleCard>
        {/* <Title size={20}>Requestee Details</Title>
        <SimpleCard>
          <SubTitle>{requestData?.hospital}</SubTitle>
        </SimpleCard> */}
        <Title size={20}>Location Details</Title>
        <MapView
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            flex: 1,
            borderRadius: 28,
            height: "100%",
            width: "100%",
            marginVertical: 8,
            borderRadius: 8,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      </View>
      <GradientButton
        paddingV={12}
        paddingH={24}
        title="Donate plasma to this person"
        onPress={() => acceptRequest()}
      />
    </View>
  );
};

export default RequestDetailsScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
