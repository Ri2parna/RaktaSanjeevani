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
import { View, StyleSheet, Button, Image } from "react-native";
import Colors from "../config/colors";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  // prevents moving back to the login screen after succesful login
  useEffect(() =>
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })
  );
  return (
    <View style={{ height: "100%" }}>
      <View style={{ flex: 1 }}>
        <LocationCard />
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "coral",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.flexRow}>
          <Button
            title="Make Requests"
            onPress={() => navigation.navigate("MakeRequests")}
          />
          <Button
            title="View Requests"
            onPress={() => navigation.navigate("ViewRequests")}
          />
        </View>
        <Button
          title="Profile Screen"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
});

const LocationCard = () => {
  return (
    <View style={styles.locationCard}>
      <SubTitle size={16} color={Colors.white}>
        Location
      </SubTitle>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title size={28} color={Colors.white}>
          Khanapara
        </Title>
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../assets/map_marker.png")}
        />
      </View>
      <Divider color={Colors.white} padding={16} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <SubTitle color={`rgba(255,255,255, .7)`}>
          Choose your blood group
        </SubTitle>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor: `rgba(255,255,255, .5)`,
          }}
        >
          <Title size={20} color={Colors.white}>
            A+
          </Title>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Divider = ({ color, size, padding }) => {
  return (
    <View
      style={{
        paddingTop: padding || 0,
        borderBottomColor: color || "black",
        borderBottomWidth: size || 0.2,
        width: "80%",
      }}
    />
  );
};
