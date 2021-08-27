import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "react-native-vector-icons";
import * as Permissions from "expo-permissions";
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
      console.log(JSON.stringify(result));
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
      console.log(JSON.stringify(result));
      if (!result.cancelled) {
        let newFile = {
          uri: result,
          type: "test/png",
          //type: ˋtest / ${ result.uri.split(".")ˋ
        };
        handleUpload;
      }
    } else {
      Alert.alert("You need to give up permission to work.");
    }
  };
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("uploadPresent", "simplonVille");
    data.append("cloadName", "dvejrvs6b");
    // https://api.cloudinary.com/v1_1/${cloudName}/upload
    fetch("https://api.cloudinary.com/v1_1/dvejrvs6b/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.fixToButton}>
        <Ionicons.Button
          style={styles.imageButton}
          name="image-outline"
          title="Left button"
          mode="contained"
          onPress={galleryClick}
        >
          <Text style={styles.imageText}>Select Image</Text>
        </Ionicons.Button>
        <Ionicons.Button
          style={styles.imageButton}
          name="camera-outline"
          title="Right button"
          mode="contained"
          onPress={cameraClick}
        >
          <Text style={styles.imageText}>Take Image</Text>
        </Ionicons.Button>
      </View>
      {/* <Button title="Select Image" onPress={selectImage} /> */}
      {/* <Image source={{ uri: imageUri }} style={styles.photos} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixToButton: {
    alignItems: "center",
    top: 145,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imageButton: {
    fontSize: 40,
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
  photos: {
    width: 145,
    height: 145,
    left: 35,
    bottom: 5,
  },
});

export default ImageScreen;
