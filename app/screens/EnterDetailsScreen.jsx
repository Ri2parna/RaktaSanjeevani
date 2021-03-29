import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../config/colors";

const EnterDetailsScreen = () => {
  return (
    <Screen>
      <View>
        <TextInput
          placeholder={"Email"}
          placeholderTextColor="#a2a2a2"
          style={[
            styles.shadow,
            {
              backgroundColor: `#f6f6f6`,
              padding: 8,
              paddingHorizontal: 24,
              marginRight: 8,
              borderRadius: 80,
              width: "80%",
            },
          ]}
        />
        <TextInput
          placeholder={"Name"}
          placeholderTextColor="#a2a2a2"
          style={[
            styles.shadow,
            {
              backgroundColor: `#f6f6f6`,
              padding: 8,
              paddingHorizontal: 24,
              marginRight: 8,
              borderRadius: 80,
              width: "80%",
            },
          ]}
        />
      </View>

      <View>
        <Title size={20}>Gender</Title>
      </View>
      <View>
        <Title size={20}>Select Blood Group</Title>
      </View>
      <LinearGradient
        colors={["#ff217a", "#ff4d4d"]}
        style={{ borderRadius: 28, width: "80%" }}
      >
        <TouchableOpacity
          style={{
            padding: 16,
            paddingHorizontal: 32,
            borderRadius: 28,
            width: "80%",
          }}
          onPress={() => setModalVisible(true)}
        >
          <Title size={20} color={Colors.white} center>
            DONE
          </Title>
        </TouchableOpacity>
      </LinearGradient>
      <Text>Do you want to make you contact number visible for other</Text>
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

    elevation: 2,
  },
});
