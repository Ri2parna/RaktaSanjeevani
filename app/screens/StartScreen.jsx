import React from "react";
import { Button, Text } from "react-native";

export default StartScreen = () => {
  return (
    <View>
      <Text>StartScreen</Text>
      <Button
        title="Go Next"
        onPress={(navigation) => {
          navigation.navigate("HomeScreen");
        }}
      ></Button>
    </View>
  );
};
