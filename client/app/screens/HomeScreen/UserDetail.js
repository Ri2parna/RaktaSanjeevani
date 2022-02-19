import axios from "axios";
import * as Location from "expo-location";
import React, { useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { CustomButton } from "../../components/CustomButton";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import Colors from "../../config/colors";
import { SimpleCard } from "../../components/SimpleCard";
import { useNavigation } from "@react-navigation/native";

export const UserDetail = ({
  currentLocation,
  name,
  active = true,
  updateLocation,
  toggleActiveStatus,
}) => {
  const navigation = useNavigation();
  // switch
  const [isEnabled, setIsEnabled] = useState(active);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleActiveStatus();
  };

  return (
    <View style={{ flex: 2, paddingHorizontal: 4 }}>
      <SimpleCard row>
        <Title>Current Location: </Title>
        {currentLocation ? (
          <SubTitle color={Colors["grey-6"]}>{currentLocation}</SubTitle>
        ) : (
          <ActivityIndicator
            size={32}
            color={Colors["grey-8"]}
            style={{ width: "12%" }}
          />
        )}
        <CustomButton
          title="Update Location"
          textSize={14}
          onPress={() => updateLocation()}
        />
      </SimpleCard>
      <Title margin={4}>User details</Title>
      <SimpleCard row>
        <Title>{name}</Title>
        <CustomButton
          title="View Profile"
          textSize={14}
          onPress={() => {
            navigation.navigate("MyProfile");
          }}
        />
      </SimpleCard>
      <Title margin={4}>Active Status</Title>
      <SimpleCard row>
        <SubTitle
          size={14}
          color={isEnabled ? Colors.success : Colors["grey-8"]}
        >
          {isEnabled ? "Active" : "InActive"}
        </SubTitle>
        <Switch
          trackColor={{ false: Colors.darkBlue, true: "salmon" }}
          thumbColor={isEnabled ? Colors.bloodRed : "aliceblue"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </SimpleCard>
    </View>
  );
};
