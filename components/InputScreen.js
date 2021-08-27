import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { string } from "yup/lib/locale";

const myInputs = yup.object({
  description: yup.string().required().min(5),
  name: yup.string().required().min(8),
  tel: yup.number().test("0612345678", "Cant put space", (val) => {
    return parseInt(val) < 100000000000;
  }),
});
export default function InputScreen() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          description: "",
          address: "",
          name: "",
          tel: "",
          mail: "",
        }}
        validationSchema={myInputs}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.input}>
            <TextInput
              style={styles.texting}
              height={100}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              dataDetectorTypes="all"
              value={values.description}
            />
            <TextInput
              style={styles.texting}
              placeholder="Jean Dubois"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <TextInput
              style={styles.texting}
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
              placeholder="06 12 34 56 78"
              keyboardType="numeric"
              onChangeText={handleChange("tel")}
              onBlur={handleBlur("tel")}
              value={values.tel}
            />
            <TextInput
              style={styles.texting}
              placeholder="exemple@exemple.com"
              keyboardType="email-address"
              onChangeText={handleChange("mail")}
              onBlur={handleBlur("mail")}
              value={values.mail}
            />
            <Button title="Envoyer" color="blue" onPress={handleSubmit} />
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
  input: {
    top: -68,
  },
  texting: {
    backgroundColor: "white",
    borderColor: "#B284BE",
    borderRadius: 5,
    //fontFamily: "Cochin",
    fontSize: 20,
    height: 40,
    justifyContent: "center",
    margin: 7,
    left: 20,
    padding: 10,
    width: 325,
  },
});

// export default InputScreen;
