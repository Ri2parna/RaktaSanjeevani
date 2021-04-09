import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/colors";
import Screen from "../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import { CustomButton } from "../components/CustomButton";
import { TextBubble } from "../components/TextBubble";
import { TouchableOpacity } from "react-native-gesture-handler";

import { api } from "../config/endpoints";

const MakeRequestsScreen = ({ navigation, city = "Tezpur" }) => {
  const [requestCount, setRequestCount] = useState(0);
  const [ListOfDonors, setListOfDonors] = useState([]);
  useEffect(() => {
    api
      .get("/blood/request/count")
      .then(({ data }) => setRequestCount(data[0]["count"]));
    api.get("/users/data/list/donors/" + city).then(({ data }) => {
      console.log(data);
      setListOfDonors(data);
    });
  }, []);
  return (
    <Screen color={Colors.white}>
      <View style={{ width: "100%", height: "100%" }}>
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
                {requestCount}
              </Title>
              <SubTitle color={Colors.white}>Active Requests</SubTitle>
            </View>
            <CustomButton
              title="Add Request"
              icon="add"
              iconColor={Colors.blood}
              onPress={() => navigation.navigate("NewRequest")}
              padding={8}
            />
          </View>
        </LinearGradient>
        <Title size={20} paddingV={8} padding={8} color="#0A0819">
          Donors Nearby
        </Title>
        <View
          style={[
            {
              flex: 3,
              padding: 8,
              marginHorizontal: 8,
              borderRadius: 4,
              backgroundColor: Colors.purewhite,
            },
            styles.shadow,
          ]}
        >
          <RequestCard
            {...ListOfDonors[1]}
            onPress={() => navigation.navigate("RequestDetails")}
          />
        </View>
      </View>
    </Screen>
  );
};

export default MakeRequestsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
  },
  cta: {
    flex: 1,
    margin: 8,
    width: "86%",
    padding: 8,
    backgroundColor: `rgba(255,255,255,.24)`,
    flexDirection: "row",
    borderRadius: 4,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.6,
    elevation: 3,
  },
});

const RequestCard = ({
  navigation,
  onPress,
  name = "Test",
  city = "N/A",
  blood = "N/A",
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={onPress}
    >
      <View style={styles.image} />
      <View style={{ margin: 4, padding: 4 }}>
        <Title size={20}>{name}</Title>
        <SubTitle size={18}>{city}</SubTitle>
      </View>
      <TextBubble placeholder={blood} padding={12} selected />
    </TouchableOpacity>
  );
};

// const RequestCard = ({ navigation, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={[styles.container, styles.shadow]}
//       onPress={onPress}
//     >
//       <View style={styles.image} />
//       <View style={{ margin: 4, padding: 4 }}>
//         <Title size={20}>Alexandra Daddario</Title>
//         <SubTitle size={18}>Location</SubTitle>
//         <SubTitle size={18}>6 units</SubTitle>
//         <SubTitle size={18}>Date</SubTitle>
//       </View>
//       <TextBubble placeholder="AB+" padding={12} selected />
//     </TouchableOpacity>
//   );
// };
