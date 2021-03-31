// // This displays a map view with the requests in the nearby region

// import * as React from "react";
// import MapView, { Callout, Marker } from "react-native-maps";
// import { StyleSheet, Text, View, Dimensions } from "react-native";

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <MapView
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         style={styles.map}
//       >
//         <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
//           <Callout>
//             <View>
//               <Text>Title</Text>
//               <Text>A long description about the target</Text>
//             </View>
//           </Callout>
//         </Marker>
//         <Marker coordinate={{ latitude: 37.79, longitude: -122.4354 }} />
//         <Marker coordinate={{ latitude: 37.8, longitude: -122.4384 }} />
//         <Marker coordinate={{ latitude: 37.81, longitude: -122.435 }} />
//         <Marker coordinate={{ latitude: 37.82, longitude: -122.439 }} />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

import React, { useEffect } from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import Colors from "../config/colors";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "../components/CustomButton";

const HomeScreen = ({ navigation }) => {
  // prevents moving back to the login screen after succesful login
  useEffect(() =>
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  );
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
              19563
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
              56778
            </Title>
            <SubTitle color={Colors.white}>Requests</SubTitle>
          </View>
          <CustomButton
            title="See Requests"
            onPress={() => navigation.navigate("ViewRequests")}
          />
        </View>
      </LinearGradient>

      <View style={{ flex: 2, backgroundColor: "pink" }}></View>
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
