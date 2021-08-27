import React from "react";
import { Ionicons } from "react-native-vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PickerScreen from "./PickerScreen";
import DateTimeScreen from "./DateTimeScreen";
import InputScreen from "./InputScreen";
import MapScreen from "./MapScreen";
import ImageScreen from "./ImageScreen";
import SendButtonScreen from "./SendButtonScreen";

// const image = { uri: '/Users/zahra/Downloads/cool-background-2.png' };
const image = {
  uri: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
};
const Separator = () => <View style={styles.separator} />;
const mapClick = () => {
  console.log("Button pressed");
};
function Home() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          //blurRadius={5}
          source={image}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.logo}>
            <Image
              style={styles.tinyLogo}
              source={require("../assets/simplon-icon.png")}
            />
            <Text style={styles.text}> SIMPLON VILLE</Text>
            <Separator />
          </View>
          <PickerScreen />
          <DateTimeScreen />
          <InputScreen />
          <MapScreen />
          <ImageScreen />
          <SendButtonScreen />
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    flex: 0.15,
    width: "100%",
    flexDirection: "row", // horizontal
    //justifyContent: "flex-start", // main

    // secondary
    position: "absolute",
    top: 40,
    backgroundColor: "#00000040",
  },
  mapButton: {
    fontSize: 40,
    color: "white",
    backgroundColor: "#99CCFF",
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  mapText: {
    fontFamily: "Arial",
    color: "white",
    fontSize: 20,
    paddingLeft: 7,
  },
  titleText: {
    fontFamily: "Montserrat",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    justifyContent: "center",
  },
  tinyLogo: {
    width: 40,
    height: 40,
    left: 5,
  },
  text: {
    fontFamily: "Cochin",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    left: 8,
    top: 9,
    alignItems: "flex-start",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
