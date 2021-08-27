import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";

function PickerScreen() {
  const [selectedValue, setSelectedValue] = useState("select");
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          picker: "animaux",
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <View style={styles.pickerContain}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Animaux" value="animaux" />
              <Picker.Item label="Proprete" value="proprete" />
              <Picker.Item label="Stationnement" value="stationnement" />
              <Picker.Item label="Traveaux" value="traveaux" />
              <Picker.Item label="Voirie" value="select" />
              <Picker.Item label="Autre" value="autre" />
            </Picker>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContain: {
    width: 345,
    top: 100,
    left: 15,
  },
});

export default PickerScreen;
