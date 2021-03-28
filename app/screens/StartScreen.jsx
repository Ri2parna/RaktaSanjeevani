import React from "react";
import { View, Button, StyleSheet, Text, Image } from "react-native";
import Screen from "../components/Screen";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import Colors from "../config/colors";

const StartScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.flexCenter}>
        <Image
          style={{ height: 80, resizeMode: "contain" }}
          source={require("../assets/sanjeevaniLogo2.png")}
        />
      </View>
      <View style={styles.logo}>
        <Title color={Colors.error} size={28}>
          Your Blood can save lives,
        </Title>
        <Title color="coral" size={20}>
          Thank you for coming forward!
        </Title>
        <SubTitle color="#788A99" size={16}>
          Lets get you started.
        </SubTitle>
        <View style={{ flex: 1 }}></View>
        <View style={{ alignSelf: "flex-end" }}>
          <Button title="Next" onPress={() => navigation.navigate("Login")} />
        </View>
      </View>
    </Screen>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  flexCenter: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "coral",
  },
  logo: {
    flex: 1,
    borderTopLeftRadius: 48,
    width: "100%",
    padding: 28,
    paddingTop: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "white",
  },
});
