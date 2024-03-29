import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { CustomButton } from "../components/CustomButton";
import { SimpleCard } from "../components/SimpleCard";
import SubTitle from "../components/SubTitle";
import { TextBubble } from "../components/TextBubble";
import Title from "../components/Title";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";

const MakeRequestsScreen = ({ navigation, city = "Tezpur" }) => {
  const [requestCount, setRequestCount] = useState(0);
  const [ListOfDonors, setListOfDonors] = useState([]);
  const { uid, cityName } = useContext(UserContext);
  useEffect(() => {
    api.get("/requestcount/" + cityName).then((response) => {
      if (response.ok) setRequestCount(response.data.count);
    });

    api.get("/donors/" + cityName).then((response) => {
      if (response.ok) setListOfDonors(response.data);
    });
  }, [cityName, uid]);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <CallToAction requestCount={requestCount} navigation={navigation} />
      <FlatList
        ListHeaderComponent={() => (
          <Title size={20} paddingV={8} padding={8} color="#0A0819">
            Donors Nearby{" "}
            <Title size={20} paddingV={8} padding={8} color="salmon">
              {cityName}
            </Title>
          </Title>
        )}
        ListEmptyComponent={EmptyContainer}
        data={ListOfDonors}
        renderItem={({ item }) => (
          <DonorCard
            {...item}
            onPress={() => navigation.navigate("Profile", { uid: item._id })}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};
const EmptyContainer = (
  <SimpleCard>
    <Title>No data available</Title>
  </SimpleCard>
);
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
      style={[
        styles.container,
        styles.shadow,
        { marginBottom: 4, maxWidth: "100%" },
      ]}
      onPress={onPress}
    >
      <View style={styles.image} />
      <View
        style={{
          margin: 4,
          padding: 4,
          flexShrink: 1,
          flexBasis: "50%",
          flexDirection: "column",
        }}
      >
        <Title size={18}>{name}</Title>
        <SubTitle size={16}>{currentLocation}</SubTitle>
      </View>
      <TextBubble placeholder={bloodType} padding={12} selected />
    </TouchableOpacity>
  );
};

const CallToAction = ({ requestCount, navigation }) => {
  return (
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
          title="New Request"
          icon="add"
          iconColor={Colors.blood}
          onPress={() => navigation.navigate("NewRequest")}
          padding={8}
        />
      </View>
    </LinearGradient>
  );
};
