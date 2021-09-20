import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "react-native-vector-icons"; // https://ionic.io
import * as Permissions from "expo-permissions";
import { Formik } from "formik";
import { Alert, StyleSheet, Text, View } from "react-native";

function ImageScreen() {
  const [image, setImage] = useState("");

  // ********* Gallery **********
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
  // ********** Camera **********
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
        console.log("imageUrl : ", JSON.stringify(result.url));
        //this.imageUrl = JSON.stringify(result.url);
        setImage(JSON.stringify(result.url));
      });
  };

  const onSubmit = (values) => {
    if (galleryClick() && galleryClick()) {
      console.log(JSON.stringify(values));
      setImage(JSON.stringify(handleUpload(values.url)));
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          imageUrl: "",
        }}
        //enableReinitialize={true}
        onSubmit={(values) => {
          //handleUpload;
          onsubmit.bind;
          handleUpload.bind(values);
        }}
      >
        {({ values }) => (
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
            {/* <View>
              <Ionicons.Button onPress={handleSubmit} />
            </View> */}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  fixToButton: {
    alignItems: "center",
    top: 120, //put on comment later
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imageButton: {
    fontSize: 30,
    color: "white",
    backgroundColor: "#99CCFF",
    paddingRight: 12,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageText: {
    fontFamily: "Arial",
    color: "white",
    fontSize: 20,
  },
});

export default ImageScreen;
