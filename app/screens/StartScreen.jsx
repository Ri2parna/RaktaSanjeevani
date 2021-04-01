import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Screen from "../components/Screen";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import Colors from "../config/colors";

const StartScreen = ({ navigation }) => {
  return (
    <Screen>
      <ImageBackground
        source={require("../assets/startBackground.jpg")}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.flexCenter}>
          <Image
            style={{ height: 80, resizeMode: "contain" }}
            source={require("../assets/sanjeevaniLogo2.png")}
          />
        </View>
        <View style={{ padding: 8 }}>
          <Title color={Colors.error} size={28}>
            Your Blood can save lives,
          </Title>
          <Title color="coral" size={20}>
            Thank you for coming forward!
          </Title>
          <SubTitle color="#788A99" size={16}>
            Now, Lets get you started.
          </SubTitle>
        </View>
        <View style={{ alignSelf: "flex-end", margin: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OTPScreen")}
            style={{
              borderRadius: 60,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <Image
              source={require("../assets/nextButtonRed.png")}
              style={{
                height: 60,
                width: 60,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
});
