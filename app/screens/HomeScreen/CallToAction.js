import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Dimensions, View, StyleSheet } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import Colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";

export const CallToAction = ({ donorCount = 0, requestCount = 0 }) => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={["#ff4d4d", "#ff217a"]} style={styles.gradient}>
      <View style={styles.cta}>
        <View style={{ alignItems: "center" }}>
          <Title color={Colors.white} size={24}>
            {donorCount == null ? (
              <ActivityIndicator size={32} color={Colors["grey-8"]} />
            ) : (
              donorCount
            )}
          </Title>
          <SubTitle color={Colors.white}>Donors</SubTitle>
        </View>
        <CustomButton
          title="I need blood"
          onPress={() => navigation.navigate("MakeRequests")}
        />
      </View>
      <View style={styles.cta}>
        <View style={{ alignItems: "center" }}>
          <Title color={Colors.white} size={24}>
            {requestCount == null ? (
              <ActivityIndicator size={32} color={Colors["grey-8"]} />
            ) : (
              requestCount
            )}
          </Title>
          <SubTitle color={Colors.white}>Requests</SubTitle>
        </View>
        <CustomButton
          title="I want to donate"
          onPress={() => navigation.navigate("ViewRequests")}
        />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
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
    height: Dimensions.get("window").height * 0.15,
  },
  gradient: {
    alignItems: "center",
  },
});
