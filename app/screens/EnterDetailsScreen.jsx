import React, { useState } from "react";
import { CheckBox, View } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import Colors from "../config/colors";
import CustomTextInput from "../components/CustomTextInput";
import { Container } from "../components/Container";
import { TextBubble } from "../components/TextBubble";
import { GradientButton } from "../components/GradientButton";
import { MaleLogo } from "../components/MaleLogo";
import { FemaleLogo } from "../components/FemaleLogo";

const EnterDetailsScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [bloodType, setBloodType] = useState(null);
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
            onChangeText={(name) => setName(name)}
          />
          <CustomTextInput
            placeholder="Email"
            width="90%"
            margin={8}
            padding={16}
            onChangeText={(email) => setEmail(email)}
          />
        </Container>
        <Title size={24} padding={16}>
          Gender
        </Title>
        <Container row>
          <MaleLogo
            selected={gender == "male"}
            onPress={() => setGender("male")}
          />
          <FemaleLogo
            selected={gender == "female"}
            onPress={() => setGender("female")}
          />
        </Container>
        <Title size={24} padding={16}>
          Select Blood Group
        </Title>
        <Container row>
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
              Do you want to make you contact number visible for others?
            </Title>
          </View>
        </Container>
        <GradientButton
          title="SUBMIT"
          margin={8}
          paddingV={16}
          onPress={() => navigation.navigate("AppStack")}
        />
      </View>
    </Screen>
  );
};

export default EnterDetailsScreen;
