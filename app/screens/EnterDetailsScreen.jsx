import React from "react";
import { Button, CheckBox, Image, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../config/colors";
import CustomTextInput from "../components/CustomTextInput";
import WhiteMaleLogo from "../assets/maleUserWhite.svg";
import DarkMaleLogo from "../assets/maleUserDark.svg";
import FemaleDarkLogo from "../assets/femaleUserDark.svg";
import TransDarkLogo from "../assets/transUserDark.svg";

const EnterDetailsScreen = () => {
  return (
    <Screen color={Colors.white}>
      <View
        style={{
          height: "100%",
          width: "100%",
          padding: 8,
        }}
      >
        <Container column>
          <CustomTextInput
            placeholder="Name"
            width="90%"
            margin={8}
            padding={16}
          />
          <CustomTextInput
            placeholder="Email"
            width="90%"
            margin={8}
            padding={16}
          />
        </Container>
        <Title size={24} padding={16}>
          Gender
        </Title>
        <Container row>
          <MaleLogo selected />
          <FemaleLogo />
        </Container>
        <Title size={24} padding={16}>
          Select Blood Group
        </Title>
        <Container row>
          <TextBubble placeholder="A+" />
          <TextBubble placeholder="A-" />
          <TextBubble placeholder="B-" />
          <TextBubble placeholder="B+" selected />
          <TextBubble placeholder="O+" />
          <TextBubble placeholder="O-" />
          <TextBubble placeholder="AB+" />
          <TextBubble placeholder="AB-" />
        </Container>
        <View style={{ flex: 1 }} />
        <Container row>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <CheckBox />
            <Title padding={12}>
              Do you want to make you contact number visible for other
            </Title>
          </View>
        </Container>
        <StyledButton title="SUBMIT" margin={8} />
      </View>
    </Screen>
  );
};

export default EnterDetailsScreen;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  buttonOutline: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderRadius: 80,
  },
});

const Container = ({ children, row, column, ...props }) => {
  return (
    <View
      style={{
        padding: 8,
        width: "100%",
        flexDirection: (row && "row") || (column && "column"),
        flexWrap: "wrap",
      }}
    >
      {children}
    </View>
  );
};

const MaleLogo = ({ selected }) => {
  if (selected) {
    return (
      <LinearGradient
        colors={["#ff217a", "#ff4d4d"]}
        style={[
          {
            borderRadius: 80,
            alignItems: "center",
          },
          styles.shadow,
        ]}
      >
        <TouchableOpacity style={[styles.buttonOutline]}>
          <WhiteMaleLogo height={40} width={40} fill={Colors.white} />
        </TouchableOpacity>
      </LinearGradient>
    );
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.buttonOutline,
          styles.shadow,
          { backgroundColor: Colors.white },
        ]}
      >
        <DarkMaleLogo height={40} width={40} fill={Colors.white} />
      </TouchableOpacity>
    );
  }
};

const FemaleLogo = ({ selected }) => {
  if (selected) {
    return (
      <LinearGradient
        colors={["#ff217a", "#ff4d4d"]}
        style={[
          {
            borderRadius: 80,
          },
          styles.shadow,
        ]}
      >
        <TouchableOpacity style={[styles.buttonOutline]}>
          <FemaleDarkLogo height={40} width={40} />
        </TouchableOpacity>
      </LinearGradient>
    );
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.buttonOutline,
          styles.shadow,
          { backgroundColor: Colors.white },
        ]}
      >
        <FemaleDarkLogo height={40} width={40} />
      </TouchableOpacity>
    );
  }
};

const TextBubble = ({ placeholder, selected }) => {
  return (
    <LinearGradient
      colors={selected ? ["#ff217a", "#ff4d4d"] : [Colors.white, Colors.white]}
      style={[
        {
          borderRadius: 80,
          margin: 8,
        },
        styles.shadow,
      ]}
    >
      <TouchableOpacity style={{ borderRadius: 80, padding: 20 }}>
        <Title size={20} color={selected ? Colors.white : "black"}>
          {placeholder}
        </Title>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const StyledButton = ({ margin, navigation, title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 28,
        alignItems: "center",
        backgroundColor: "red",
        width: "100%",
      }}
      onPress={() => null}
    >
      <LinearGradient
        colors={["#ff217a", "#ff4d4d"]}
        style={{
          borderRadius: 28,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Title size={20} color={Colors.white} paddingV={20}>
          {title}
        </Title>
      </LinearGradient>
    </TouchableOpacity>
  );
};
