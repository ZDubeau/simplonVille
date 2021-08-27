import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { Formik } from "formik";

function SendButtonScreen() {
  return (
    <View style={styles.container}>
      <Formik
        //onSubmit={(values) => console.log(values)}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleSubmit }) => (
          <View style={styles.sendButton}>
            <Button
              style={styles.myButton}
              color="white"
              fontFamily="Cochin"
              title="Envoyer"
              onPress={handleSubmit}
              // onPress={() =>
              //   Alert.alert(
              //     "Vous etes sur d'envoyer ce courriel ? ",
              //     "email@mail.fr",
              //     [
              //       {
              //         text: "Oui",
              //         onPress: () => Alert.alert("La demande a ete envoye."),
              //       },
              //       {
              //         text: "Non",
              //         onPress: () => Alert.alert("La demande a ete annule."),
              //       },
              //     ]
              //   )
              // }
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 50,
  },
  sendButton: {
    width: "89%",
    backgroundColor: "#FFCC99", //"#B284BE",
    top: -20,
    left: 20,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default SendButtonScreen;
