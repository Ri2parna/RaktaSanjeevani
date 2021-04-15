import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { CustomButton } from "../components/CustomButton";
import Screen from "../components/Screen";
import SubTitle from "../components/SubTitle";
import { TextBubble } from "../components/TextBubble";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";

const MakeRequestsScreen = ({ navigation, city = "Tezpur" }) => {
  const [requestCount, setRequestCount] = useState(0);
  const [ListOfDonors, setListOfDonors] = useState([]);
  const { cityName } = useContext(UserContext);
  useEffect(() => {
    api.get("/requestcount/" + cityName).then((response) => {
      if (response.ok) {
        setRequestCount(response.data.count);
      }
    });

    api.get("/donors/" + "Tezpur").then((response) => {
      if (response.ok) {
        setListOfDonors(response.data);
      }
    });
  }, []);
  return (
    <Screen color={Colors.white}>
      <View style={{ width: "100%", height: "100%" }}>
        <LinearGradient
          colors={["#ff4d4d", "#ff217a"]}
          style={{
            width: "100%",
            minHeight: "24%",
            maxHeight: "24%",
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
              <SubTitle size={12} color={Colors.white}>
                Nearby
              </SubTitle>
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
        <FlatList
          contentContainerStyle={[
            styles.shadow,
            {
              margin: 8,
              padding: 8,
              borderRadius: 4,
              backgroundColor: Colors.purewhite,
              minHeight: "100%",
              paddingBottom: "28%",
            },
          ]}
          ListHeaderComponent={() => (
            <Title size={20} paddingV={8} padding={8} color="#0A0819">
              Donors Nearby
            </Title>
          )}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator color={Colors.blood} size={60} />
              </View>
            );
          }}
          data={ListOfDonors}
          renderItem={({ item }) => (
            <DonorCard
              {...item}
              onPress={() =>
                navigation.navigate("RequestDetails", { rid: item._id })
              }
            />
          )}
          keyExtractor={(item, index) => item._id}
        />
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
    height: 80,
    width: 80,
    borderRadius: 80,
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

const DonorCard = ({
  navigation,
  onPress,
  bloodType,
  name,
  currentLocation,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow, { marginBottom: 4 }]}
      onPress={onPress}
    >
      <View style={styles.image} />
      <View
        style={{
          margin: 4,
          padding: 4,
          flexShrink: 1,
        }}
      >
        <Title size={18}>{name}</Title>
        <SubTitle size={16}>{currentLocation}</SubTitle>
      </View>
      <TextBubble placeholder={bloodType} padding={12} selected />
    </TouchableOpacity>
  );
};
