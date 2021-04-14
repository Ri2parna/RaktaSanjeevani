import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import Screen from "../../components/Screen";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import Colors from "../../config/colors";
import CustomTextInput from "../../components/CustomTextInput";
import { GradientButton } from "../../components/GradientButton";
import { Container } from "../../components/Container";
import { api } from "../../config/endpoints";
import { storeData } from "../../utils/asyncStorage";

import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAzDU49zIIqxsTa3nZSrqdG3rW55Qa0lqM",
  authDomain: "raktasanjeevani-d6968.firebaseapp.com",
  projectId: "raktasanjeevani-d6968",
  storageBucket: "raktasanjeevani-d6968.appspot.com",
  messagingSenderId: "388322814025",
  appId: "1:388322814025:web:de00e70e42207cc8ac7798",
  measurementId: "G-NY2K6YV7KG",
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

const VerifyOTPScreen = ({ navigation }) => {
  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;

  const [countryCode, setCountryCode] = useState("+91");
  const [uid, setUid] = useState(null);
  return (
    <Screen color={Colors.purewhite}>
      <View
        style={{
          paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
          width: "100%",
          height: "100%",
          padding: 16,
        }}
      >
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
        <Title size={28} marginTop={44}>
          Verify your phone
        </Title>
        <SubTitle size={16}>
          Enter your phone number so that we can sign you up
        </SubTitle>
        <Text style={styles.customText}>Phone Number:</Text>
        <Container row>
          <CustomTextInput
            marginVertical={8}
            placeholder={"+91"}
            autoFocus={isConfigValid}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            editable={false}
            onChangeText={(countryCode) => setCountryCode(countryCode)}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            marginVertical={8}
            placeholder={"99XX XXX XXX"}
            autoFocus={isConfigValid}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            editable={!verificationId}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
        </Container>

        <GradientButton
          title={`${verificationId ? "Resend" : "Send"} Verification Code`}
          disabled={!phoneNumber}
          paddingV={8}
          paddingH={20}
          onPress={async () => {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
              setVerifyError(undefined);
              setVerifyInProgress(true);
              setVerificationId("");
              const verificationId = await phoneProvider.verifyPhoneNumber(
                countryCode + phoneNumber,
                // @ts-ignore
                recaptchaVerifier.current
              );
              setVerifyInProgress(false);
              setVerificationId(verificationId);
              verificationCodeTextInput.current?.focus();
            } catch (err) {
              setVerifyError(err);
              setVerifyInProgress(false);
            }
          }}
        />

        {verifyError && (
          <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
        )}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
        {verificationId ? (
          <Text style={styles.success}>
            A verification code has been sent to your phone
          </Text>
        ) : undefined}
        <Text style={styles.customText}>Verification Code: </Text>
        <TextInput
          ref={verificationCodeTextInput}
          style={
            !!verificationId
              ? [styles.textInput, styles.editable]
              : styles.textInput
          }
          editable={!!verificationId}
          placeholder="12XXXX"
          onChangeText={(verificationCode) =>
            setVerificationCode(verificationCode)
          }
        />

        <GradientButton
          title="Confirm Verification Code"
          disabled={!verificationCode}
          paddingV={12}
          paddingH={24}
          onPress={async () => {
            try {
              setConfirmError(undefined);
              setConfirmInProgress(true);
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              const authResult = await firebase
                .auth()
                .signInWithCredential(credential);
              setConfirmInProgress(false);
              setVerificationId("");
              setVerificationCode("");
              verificationCodeTextInput.current?.clear();

              const previouslyRegisteredUser = await api.get("/registration", {
                phone: phoneNumber,
              });
            } catch (err) {
              setConfirmError(err);
              setConfirmInProgress(false);
            }
          }}
        />

        {confirmError && (
          <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
        )}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}

        {!isConfigValid && (
          <View style={styles.overlay} pointerEvents="none">
            <Text style={styles.overlayText}>
              To get started, set a valid FIREBASE_CONFIG in App.tsx.
            </Text>
          </View>
        )}
        <Image
          source={require("../../assets/mailboxIcon.png")}
          style={{
            height: 400,
            width: Dimensions.get("screen").width,
            alignSelf: "center",
          }}
        />
      </View>
    </Screen>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  customText: {
    fontWeight: "bold",
    color: Colors.secondary,
    marginTop: 12,
    fontSize: 18,
  },
  editable: {
    borderColor: "gray",
    elevation: 3,
    backgroundColor: "aliceblue",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginTop: 50,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: "bold",
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 0.2,
    borderRadius: 40,
    padding: 4,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  success: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
});
