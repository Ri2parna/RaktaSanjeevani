import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Screen from "../components/Screen";
import Colors from "../config/colors";
import { api } from "../config/endpoints";
import { TextBubble } from "../components/TextBubble";
import UserContext from "../hooks/userContext";
import moment from "moment";

const ViewRequestsScreen = ({ navigation }) => {
  const { cityName } = useContext(UserContext);
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/request/" + cityName)
      .then((response) => {
        if (response.ok) {
          setRequestList(response.data);
        }
      })
      .then(() => setLoading(false));
  }, []);
  return (
    <FlatList
      contentContainerStyle={[
        {
          padding: 8,
          borderRadius: 4,
          backgroundColor: Colors.purewhite,
          width: "100%",
          // this makes the screen unscrollable when the list exceeds screen size
          minHeight: "100%",
          alignItems: "center",
        },
        styles.shadow,
      ]}
      data={requestList}
      ListEmptyComponent={
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.blood} size={60} />
          ) : (
            <SubTitle>There are no active requests in your area</SubTitle>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <RequestCard
          name={item.patientName}
          hospital={item.hospital}
          units={item.units}
          date={item.createdAt}
          city={item.location}
          bloodType={item.bloodType}
          onPress={() => navigation.navigate("RequestDetails", item)}
        />
      )}
      keyExtractor={(item, index) => item._id}
    />
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
      <View style={{ margin: 4, padding: 4, flexShrink: 1 }}>
        <Title size={18}>{name || "Alexandra Daddario"}</Title>
        <SubTitle size={16}>{hospital}</SubTitle>
        <SubTitle size={16}>{`${units} units`}</SubTitle>
        <SubTitle size={16}>{moment(date).calendar()}</SubTitle>
      </View>
      <TextBubble placeholder={bloodType} padding={12} selected />
    </TouchableOpacity>
  );
};
