import React, { useState, useEffect } from "react";
import { Platform, View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";

export default function MyMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(location);
    })();
  }, []);

  let userLocation = "Waiting..";
  if (errorMsg) {
    userLocation = errorMsg;
  } else if (location) {
    userLocation = location.coords.latitude + ", " + location.coords.longitude;
    console.log(userLocation);
  }

  return (
    <View style={styles.container}>
      <TextInput>{userLocation}</TextInput>
      <MapView style={styles.map} region={location}>
        <Marker
          coordinate={{
            userLocation,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: 350,
    height: 300,
  },
});

const GetCurrentLocation = async () => {
  var provider = await Location.getProviderStatusAsync();
  console.log("provider ", provider);
  if (provider) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);
    if (status == "granted") {
      try {
        let { coords } = await Location.watchPositionAsync(
          {
            accuracy: 5,
            enableHighAccuracy: true,
            timeInterval: 100,
          },
          async (position) => {
            //console.log("position: ", position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  }
};
