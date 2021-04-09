import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Screen from "../components/Screen";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import { TextBubble } from "../components/TextBubble";
const ViewRequestsScreen = ({ navigation, city = "Guwahati" }) => {
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    api
      .get("users/data/list/request/" + city)
      .then(({ data }) => setRequestList(data));
  }, []);
  return (
    <Screen color={Colors.purewhite}>
      <FlatList
        contentContainerStyle={[
          {
            padding: 8,
            borderRadius: 4,
            backgroundColor: Colors.purewhite,
            width: "100%",
            height: "100%",
            alignItems: "center",
          },
          styles.shadow,
        ]}
        data={requestList}
        ListEmptyComponent={<Title>No Requests so far.</Title>}
        renderItem={({ item }) => (
          <RequestCard
            name={item.pname}
            hospital={item.hname}
            units={item.unit}
            date={item.date}
            city={item.city}
            onPress={() => navigation.navigate("RequestDetails", item)}
          />
        )}
        keyExtractor={(item, index) => item.slno + index}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
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
export default ViewRequestsScreen;
const RequestCard = ({
  navigation,
  onPress,
  name,
  hospital,
  units,
  date,
  bloodType,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.shadow,
        { width: "96%", marginBottom: 4 },
      ]}
      onPress={onPress}
    >
      <View style={styles.image} />
      <View style={{ margin: 4, padding: 4 }}>
        <Title size={20}>{name || "Alexandra Daddario"}</Title>
        <SubTitle size={18}>{hospital}</SubTitle>
        <SubTitle size={18}>{`${units} units`}</SubTitle>
        <SubTitle size={18}>{date}</SubTitle>
      </View>
      <TextBubble placeholder={bloodType || "N/A"} padding={12} selected />
    </TouchableOpacity>
  );
};
