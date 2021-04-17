import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import CustomTextInput from "../../components/CustomTextInput";
import { FemaleLogo } from "../../components/FemaleLogo";
import { GradientButton } from "../../components/GradientButton";
import { MaleLogo } from "../../components/MaleLogo";
import { TextBubble } from "../../components/TextBubble";
import Title from "../../components/Title";
import Colors from "../../config/colors";
import { api } from "../../config/endpoints";
import UserContext from "../../hooks/userContext";
import { storeData } from "../../utils/asyncStorage";

const RegisterScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [bloodType, setBloodType] = useState(null);
  const { setUid } = useContext(UserContext);
  // switch
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSubmit = () => {
    api
      .post("/registration", {
        name,
        age,
        phone: phoneNumber,
        bloodType,
        active: isEnabled,
      })
      .then((response) => {
        if (response.ok) {
          setUid(response.data._id);
          // store the data into local storage
          storeData("uid", response.data._id);
          storeData("isSignedIn", true);
          navigation.navigate("AppStack");
        }
      });
  };
  return (
    <View style={styles.screen}>
      <Title margin={4} padding={4} paddingV={8}>
        Enter Name:
      </Title>
      <CustomTextInput
        placeholder="Name"
        onChangeText={(name) => setName(name)}
      />
      <Title margin={4} padding={4} paddingV={8}>
        Enter Age:
      </Title>
      <CustomTextInput
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        placeholder="Age"
        onChangeText={(age) => setAge(age)}
      />
      <Title margin={4} padding={4} paddingV={8}>
        Verified Phone Number : (from OTP)
      </Title>
      <CustomTextInput
        placeholder={phoneNumber}
        editable={false}
        placeholderTextColor={"salmon"}
        style={{ elevation: 0 }}
      />
      <Title margin={4} padding={4} paddingV={8}>
        Gender
      </Title>
      <View style={{ flexDirection: "row" }}>
        <MaleLogo
          selected={gender == "male"}
          onPress={() => setGender("male")}
        />
        <FemaleLogo
          selected={gender == "female"}
          onPress={() => setGender("female")}
        />
      </View>
      <Title margin={4} padding={4} paddingV={8}>
        Select Blood Group
      </Title>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <TextBubble
          placeholder="A+"
          padding={16}
          margin={4}
          onPress={() => setBloodType("A+")}
          selected={bloodType == "A+"}
        />
        <TextBubble
          placeholder="A-"
          padding={16}
          margin={4}
          onPress={() => setBloodType("A-")}
          selected={bloodType == "A-"}
        />
        <TextBubble
          placeholder="B-"
          padding={16}
          margin={4}
          onPress={() => setBloodType("B-")}
          selected={bloodType == "B-"}
        />
        <TextBubble
          placeholder="B+"
          padding={16}
          margin={4}
          onPress={() => setBloodType("B+")}
          selected={bloodType == "B+"}
        />
        <TextBubble
          placeholder="O+"
          padding={16}
          margin={4}
          onPress={() => setBloodType("O+")}
          selected={bloodType == "O+"}
        />
        <TextBubble
          placeholder="O-"
          padding={16}
          margin={4}
          onPress={() => setBloodType("O-")}
          selected={bloodType == "O-"}
        />
        <TextBubble
          placeholder="AB+"
          padding={16}
          margin={4}
          onPress={() => setBloodType("AB+")}
          selected={bloodType == "AB+"}
        />
        <TextBubble
          placeholder="AB-"
          padding={16}
          margin={4}
          onPress={() => setBloodType("AB-")}
          selected={bloodType == "AB-"}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Title padding={12}>
          Do you want to make you contact number visible for others?
        </Title>
      </View>
      <View style={{ flex: 1 }} />
      <GradientButton
        title="SUBMIT"
        paddingV={16}
        onPress={() => handleSubmit()}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.purewhite,
    paddingHorizontal: 8,
    paddingBottom: 12,
    height: "100%",
  },
});
