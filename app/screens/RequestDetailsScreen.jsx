import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Screen from "../components/Screen";
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

const RequestDetailsScreen = ({ navigation, route }) => {
  const { uid, location } = useContext(UserContext);
  const { rid } = route.params;
  const [requestData, setRequestData] = useState(null);
  useEffect(() => {
    api
      .get("/request", { rid: "6077ee17de973c35e3d0c545" })
      .then((response) => {
        if (response.ok) {
          setRequestData(response.data);
          console.log(response.data);
        }
      });
  }, []);
  return (
    <View style={{ width: "100%", height: "100%", padding: 8 }}>
      <View style={{ flex: 1 }}>
        <Title size={20}>Patient Details</Title>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextBubble placeholder={"AB-"} selected padding={16} margin={8} />
            <View>
              <Title size={20} color={Colors.blood}>
                {requestData?.patientName}
              </Title>
              <SubTitle>{requestData?.location}</SubTitle>
              <SubTitle>{moment(requestData?.createdAt).calendar()}</SubTitle>
              <SubTitle>{`Units required: ${requestData?.units}`}</SubTitle>
              <SubTitle>{requestData?.hospital}</SubTitle>
            </View>
          </View>
        </Card>
        <Title size={20}>Hospital Details</Title>
        <Card>
          <SubTitle>{requestData?.hospital}</SubTitle>
        </Card>
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
        title="Donate blood to this person"
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

const Card = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={{
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.purewhite,
        justifyContent: "center",
        flexShrink: 1,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};
