import React, { useState, useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import Colors from "../config/colors";
import CustomTextInput from "../components/CustomTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { api } from "../config/endpoints";
import UserContext from "../hooks/userContext";

import TransDarkLogo from "../assets/transUserDark.svg";
import { TextBubble } from "../components/TextBubble";
import { GradientButton } from "../components/GradientButton";
import { MaleLogo, FemaleLogo } from "../components/logo";

import { ScrollView } from "react-native-gesture-handler";
import SubTitle from "../components/SubTitle";
import { CustomButton } from "../components/CustomButton";
import { SimpleCard } from "../components/SimpleCard";

const NewRequest = ({ navigation, route }) => {
  const [bloodType, setBloodType] = useState(null);
  const [gender, setGender] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [units, setUnits] = useState(null);
  const [validity, setValidity] = useState(null);
  const { uid, location, cityName } = useContext(UserContext);

  const [date, setDate] = useState(moment.now());

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
      ? selectedDate > date
        ? selectedDate
        : date
      : date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const submitBloodRequest = async () => {
    api
      .post("/request", {
        patientName,
        bloodType,
        units,
        from: uid,
        validity: date,
        cityName,
        location,
        hospital,
      })
      .then((response) => {
        if (response.ok) {
          alert("Success");
          navigation.navigate("Home");
        } else {
          console.log(response.data);
          console.warn("Houston, there has been an error");
        }
      });
  };

  return (
    <ScrollView style={{ padding: 4, paddingHorizontal: 8 }}>
      {/* <View style={styles.screen}> */}
      <SimpleCard flexStart row>
        <Title margin={8}>Patient Name: </Title>
        <CustomTextInput
          placeholder="Patient Name"
          width="100%"
          onChangeText={(name) => setPatientName(name)}
        />
        <Title margin={8}>Hospital admitted in: </Title>
        <CustomTextInput
          placeholder="Hospital Name"
          width="100%"
          onChangeText={(name) => setHospital(name)}
        />
        <Title margin={8}>Units of blood required:</Title>
        <CustomTextInput
          keyboardType="phone-pad"
          placeholder="Units Required"
          onChangeText={(units) => setUnits(units)}
          width="100%"
        />
        <Title margin={8}>Blood to be required by:</Title>
        <SimpleCard row>
          <CustomTextInput
            style={{ flex: 1, marginHorizontal: 8 }}
            placeholder={moment(date).format("L")}
            editable={false}
          />
          <CustomButton title={"Select date"} onPress={showDatepicker} />
        </SimpleCard>
      </SimpleCard>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <SimpleCard flexStart row>
        <Title padding={16}>Select Blood Group</Title>
        <SimpleCard row flexStart>
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
        </SimpleCard>
      </SimpleCard>
      <SimpleCard row flexStart>
        <Title padding={16}>Gender</Title>
        <SimpleCard row flexStart>
          <MaleLogo
            selected={gender == "male"}
            onPress={() => setGender("male")}
          />
          <FemaleLogo
            selected={gender == "female"}
            onPress={() => setGender("female")}
          />
        </SimpleCard>
      </SimpleCard>
      <GradientButton
        title="SUBMIT"
        margin={8}
        paddingV={16}
        onPress={() => {
          submitBloodRequest();
        }}
      />

      <SimpleCard flexStart row>
        <SubTitle size={12} padding={8} color={Colors["grey-6"]}>
          * Your location will be recorded for this request
        </SubTitle>
      </SimpleCard>
    </ScrollView>
  );
};

export default NewRequest;

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
    borderRadius: 80,
  },
  screen: {
    width: "100%",
    height: "100%",
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.purewhite,
  },
});
