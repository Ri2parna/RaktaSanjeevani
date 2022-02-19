import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key = "isUserLoggedIn") => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};

const storeData = async (key, value) => {
  try {
    // console.log(`Storing data: ${value}`);
    await AsyncStorage.setItem(key, String(value));
  } catch (e) {
    console.error(e);
  }
};

const removeData = async (key = "isUserLoggedIn") => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e); // error
  }
};

module.exports = {
  getData,
  storeData,
  removeData,
};
