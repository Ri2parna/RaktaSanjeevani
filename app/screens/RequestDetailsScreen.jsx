import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import MapView, { Callout, Marker } from "react-native-maps";
import { Colors } from "react-native/Libraries/NewAppScreen";

const RequestDetailsScreen = ({ navigation }) => {
  return (
    <Screen color={Colors.white}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ flex: 2 }}>
          <Title size={20}>Rituparna Das</Title>
          <SubTitle>Karnataka, India</SubTitle>
        </View>
        <SubTitle size={20}>Request Location</SubTitle>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              flex: 1,
              margin: 8,
            }}
          >
            <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
          </MapView>
        </View>
      </View>
    </Screen>
  );
};

export default RequestDetailsScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
