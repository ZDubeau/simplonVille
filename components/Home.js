import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "react-native-vector-icons"; // https://ionic.io
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Formik } from "formik";
import moment from "moment"; // https://momentjs.com
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
function Home() {
  const [selectedItem, setSelectedItem] = useState("select");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(45.188529);
  const [longitude, setLongitude] = useState(5.724524);

  // ***************************** Gallery
  const galleryClick = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        let newFile = {
          uri: result.uri,
          type: `test /${result.uri.split(".")[1]}`,
          name: `test.${result.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("You need to give up permission to work.");
    }
  };
  // **************************** Camera
  const cameraClick = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        let newFile = {
          uri: result.uri,
          type: `test /${result.uri.split(".")[1]}`,
          name: `test.${result.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("You need to give up permission to work.");
    }
  };
  // **************************** Save image in cloudinary
  const handleUpload = (file) => {
    const result = new FormData();
    result.append("file", file);
    result.append("upload_preset", "simplonVille");
    result.append("cloadName", "dvejrvs6b");
    // https://api.cloudinary.com/v1_1/${cloudName}/upload
    fetch("https://api.cloudinary.com/v1_1/dvejrvs6b/image/upload", {
      method: "post",
      body: result,
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log("imageUrl : ", JSON.stringify(result.url));
        setImage(JSON.stringify(result.url));
      });
  };
  // ************************** get User Location
  const userLocation = async () => {
    let provider = await Location.getProviderStatusAsync();
    if (provider) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        try {
          let location = await Location.watchPositionAsync(
            {
              accuracy: 5,
              enableHighAccuracy: true,
              timeInterval: 100,
            },
            async (location) => {
              setLatitude(location.coords.latitude);
              setLongitude(location.coords.longitude);
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
  useEffect(() => {
    userLocation();
  }, []);
  // ************************** Send Mail
  function sendMail(values) {
    const templateParams = {
      address: values.address,
      datetime: values.datetime,
      description: values.description,
      mail: values.mail,
      name: values.name,
      tel: values.tel,
      type: values.type,
      imageUrl: image,
      coordinate: [latitude, longitude],
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
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }
  // *************************** Initialize Values
  const initialValues = {
    address: "",
    datetime: moment().format("YYYY-MMM-DD LT"),
    description: "",
    mail: "",
    name: "",
    tel: "",
    type: "",
    imageUrl: "",
    userLocation: "",
  };
  // ***************************** FORM
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          sendMail(values);
          handleUpload.bind(values);
          resetForm(initialValues);
        }}
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
              source={require("../assets/bg-image.jpg")}
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
              <View style={styles.strange}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="datetime"
                  is24Hour={true}
                  onConfirm={handleConfirm}
                  datetime={moment(values.datetime)}
                  maxDate={new Date()}
                  disabled={true}
                />
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
              <View style={styles.fixToButton}>
                <Ionicons.Button
                  style={styles.imageButton}
                  name={image == "" ? "image-outline" : "checkmark-outline"}
                  title="Left button"
                  mode="contained"
                  onPress={galleryClick}
                >
                  <Text style={styles.imageText}>Select Image</Text>
                </Ionicons.Button>
                <Ionicons.Button
                  style={styles.imageButton}
                  name={image == "" ? "camera-outline" : "checkmark-outline"} //Change icon condition when user choose an image or not
                  title="Right button"
                  mode="contained"
                  onPress={cameraClick}
                >
                  <Text style={styles.imageText}>Take Image</Text>
                </Ionicons.Button>
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
              <View>
                <MapView
                  style={styles.map}
                  value={values.userLocation}
                  initialRegion={location}
                  region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  showsUserLocation
                >
                  <Marker
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    title="Vous etes ici"
                    pinColor="purple"
                  />
                </MapView>
              </View>
              <View style={styles.sendButton}>
                <Button
                  title="Envoyer"
                  color="white"
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
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    top: 8,
  },
  logo: {
    flex: 0.15,
    width: "100%",
    flexDirection: "row",
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
  texting: {
    backgroundColor: "white",
    borderColor: "#B284BE",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    justifyContent: "center",
    margin: 7,
    left: 18,
    padding: 10,
    width: 325,
  },
  myTime: {
    flex: 1,
    left: 93,
  },
  sendButton: {
    width: "89%",
    backgroundColor: "#99CCFF",
    top: 20,
    left: 20,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 100,
  },
  pickerContain: {
    width: 345,
    left: 15,
  },
  strange: {
    flex: 1,
    left: 40,
    top: 20,
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 10,
  },
  fixToButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imageButton: {
    color: "white",
    backgroundColor: "#99CCFF",
    paddingRight: 11,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageText: {
    fontFamily: "Arial",
    color: "white",
    fontSize: 20,
  },
  map: {
    top: 10,
    left: 25,
    width: 325,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B284BE",
  },
});

export default Home;
