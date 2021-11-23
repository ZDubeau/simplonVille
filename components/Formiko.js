import * as React from "react";
import { ImagePicker } from "expo";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import { Alert, Keyboard, Image, View, StyleSheet } from "react-native";

const initialValues = {
  title: "",
  image: "",
};

export default class Formiko extends React.Component {
  onSubmit(values) {
    //List of form values
    console.log(values);
    Alert.alert(JSON.stringify(values));
    Keyboard.dismiss();
  }

  async _pickImage(handleChange) {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      handleChange(result.uri);
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.content]}>
        <Formik
          initialValues={initialValues}
          onSubmit={this.onSubmit.bind(this)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <Button
                icon="add-a-photo"
                mode="contained"
                style={styles.button}
                onPress={() => {
                  this._pickImage(handleChange("image"));
                }}
              >
                Pick an image from camera roll
              </Button>
              {values.image && values.image.length > 0 ? (
                <Image
                  source={{ uri: values.image }}
                  style={{ width: 200, height: 200 }}
                />
              ) : null}
              <Button onPress={handleSubmit} style={styles.button}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  content: {
    paddingTop: 40,
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});
