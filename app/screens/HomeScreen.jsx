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

import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";

const HomeScreen = () => {
  return (
    <Screen>
      <Title>HomeScreen</Title>
    </Screen>
  );
};

export default HomeScreen;
