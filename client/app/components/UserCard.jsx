import React from "react";
import { View } from "react-native";
import SubTitle from "./SubTitle";
import { TextBubble } from "./TextBubble";
import Title from "./Title";
import { SimpleCard } from "./SimpleCard";

export const UserCard = ({ name, verified, currentLocation, bloodType }) => {
  return (
    <SimpleCard row>
      <TextBubble placeholder={bloodType} padding={16} margin={12} selected />
      <View style={{ flex: 1 }}>
        <Title>{name}</Title>
        <SubTitle>{currentLocation}</SubTitle>
        <SubTitle>{`Verification Status: ${
          verified ? "verified" : "Not Verified"
        }`}</SubTitle>
      </View>
    </SimpleCard>
  );
};
