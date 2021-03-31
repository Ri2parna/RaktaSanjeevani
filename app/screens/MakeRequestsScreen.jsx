import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Colors from "../config/colors";
import Screen from "../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { GradientButton } from "../components/GradientButton";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import { CustomButton } from "../components/CustomButton";

const MakeRequestsScreen = ({ navigation }) => {
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
                19563
              </Title>
              <SubTitle color={Colors.white}>Active Requests</SubTitle>
            </View>
            <CustomButton
              title="Add Request"
              icon="add"
              iconColor={Colors.blood}
              onPress={() => navigation.navigate("MakeRequests")}
              padding={8}
            />
          </View>
        </LinearGradient>

        <View style={{ flex: 3 }}>
          <Title size={20} paddingV={8} padding={8}>
            Recent Requests
          </Title>
        </View>
      </View>
    </Screen>
  );
};

export default MakeRequestsScreen;
const styles = StyleSheet.create({
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
});
