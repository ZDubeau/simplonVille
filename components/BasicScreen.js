import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "react-native-vector-icons"; // https://ionic.io
import * as Permissions from "expo-permissions";
import { Formik } from "formik";
// https://momentjs.com
import moment from "moment";
import localization from "moment/locale/fr";
import emailjs from "emailjs-com";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import * as yup from "yup";
import { string } from "yup/lib/locale";

//import DateTimeScreen from "./DateTimeScreen";
import MapScreen from "./MapScreen";
import ImageScreen from "./ImageScreen";

// const image = { uri: '/Users/zahra/Downloads/cool-background-2.png' };
const image = {
  uri: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
};
const Separator = () => <View style={styles.separator} />;

const onNewDateTime = (event, newTime) => {
  if (newTime != undefined) {
    setDate(newTime);
  }
};
const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};
const showDateTimepicker = () => {
  showMode("datetime");
};

const handleConfirm = () => {
  moment.locale("fr", localization);
  setFieldValue("datetime", moment().format("YYYY-MMM-DD LT"));
  hideDatePicker();
};
function BasicScreen() {
  const [selectedItem, setSelectedItem] = useState("select");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [image, setImage] = useState("");

  function sendMail(values) {
    const templateParams = {
      address: values.address,
      datetime: values.datetime,
      description: values.description,
      mail: values.mail,
      name: values.name,
      tel: values.tel,
      type: values.type,
      imageUrl: values.imageUrl,
    };

    // emailjs.send(serviceID, templateID, templateParams, userID);
    emailjs
      .send(
        "gmail",
        "template_dycqypw",
        templateParams,
        "user_M2gR2wMBxLP68tsLuwR3d"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          console.log(templateParams.imageUrl);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          address: "",
          datetime: moment().format("YYYY-MMM-DD LT"),
          description: "",
          mail: "",
          name: "",
          tel: "",
          type: "",
          //imageUrl: [""],
        }}
        enableReinitialize={true}
        //validationSchema={myInputs}
        onSubmit={(values) => sendMail(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
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
              <View style={styles.pickerContain}>
                <Picker
                  name="type"
                  selectedValue={selectedItem}
                  onValueChange={(itemValue, itemIndex) => {
                    setFieldValue("type", itemValue);
                    setSelectedItem(itemValue);
                  }}
                >
                  <Picker.Item label="Animaux" value="animaux" />
                  <Picker.Item label="Proprete" value="proprete" />
                  <Picker.Item label="Stationnement" value="stationnement" />
                  <Picker.Item label="Travaux" value="travaux" />
                  <Picker.Item label="Voirie" value="voirie" />
                  <Picker.Item label="Autre" value="autre" />
                </Picker>
              </View>
              {/* <View>
                <DateTimeScreen />
              </View> */}
              <View style={styles.strange}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="datetime"
                  is24Hour={true}
                  //onChange={onNewDateTime}
                  onConfirm={handleConfirm}
                  datetime={moment(values.datetime)}
                  //handleSubmit={handleSubmit}
                  maxDate={new Date()}
                  //disabled={true}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.texting}
                  label="Description"
                  height={100}
                  placeholder="Description"
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  dataDetectorTypes="all"
                  value={values.description}
                  name="description"
                />
                <TextInput
                  style={styles.texting}
                  placeholder="Jean Dubois"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  name="name"
                />
                <TextInput
                  style={styles.texting}
                  name="address"
                  height={60}
                  placeholder="1, rue Isere, 38000, Grenoble"
                  multiline={true}
                  dataDetectorTypes="address"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />
                <TextInput
                  style={styles.texting}
                  name="tel"
                  placeholder="06 12 34 56 78"
                  keyboardType="numeric"
                  onChangeText={handleChange("tel")}
                  onBlur={handleBlur("tel")}
                  value={values.tel}
                />
                <TextInput
                  style={styles.texting}
                  name="mail"
                  placeholder="exemple@exemple.com"
                  keyboardType="email-address"
                  onChangeText={handleChange("mail")}
                  onBlur={handleBlur("mail")}
                  value={values.mail}
                />
              </View>
              {/* <MapScreen />*/}
              <View>
                <ImageScreen />
              </View>
              <View style={styles.sendButton}>
                <Button
                  title="Envoyer"
                  onPress={() => {
                    setFieldValue(
                      "datetime",
                      moment(new Date(date)).format("YYYY-MMM-DD LT")
                    );
                    handleSubmit(values);
                  }}
                />
              </View>
            </ImageBackground>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
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
  input: {
    //top: -68,
  },
  texting: {
    backgroundColor: "white",
    borderColor: "#B284BE",
    borderWidth: 1,
    borderRadius: 5,
    //fontFamily: "Cochin",
    fontSize: 20,
    height: 40,
    justifyContent: "center",
    margin: 7,
    left: 20,
    padding: 10,
    width: 325,
    //top: 250,
  },
  myTime: {
    //top: 15,
    flex: 1,
    left: 93,
  },
  sendButton: {
    width: "89%",
    backgroundColor: "#FFCC99", //"#B284BE",
    top: 20,
    left: 20,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
  },
  pickerContain: {
    width: 345,
    top: 80,
    left: 15,
  },
  strange: {
    flex: 1,
    left: 93,
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 10,
  },
});

export default BasicScreen;
