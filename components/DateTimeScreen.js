import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, Button, Platform } from "react-native";
import { Formik } from "formik";
// https://momentjs.com
import moment from "moment";
import localization from "moment/locale/fr";

function DateTimeScreen() {
  const [mode, setMode] = useState("date");

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };

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
  const [date, setDate] = useState(new Date());
  return (
    <Formik
      initialValues={{
        tempo: moment().format("YYYY-MMM-DD LT"),
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, handleSubmit, values, setFieldValue }) => (
        <View style={styles.container}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="datetime"
            is24Hour={true}
            onChange={(event, selectedDate) => {
              //setShow(Platform.OS === "ios");
              SetDate(selectedDate);
              setFieldValue("tempo", moment(selectedDate).format());
            }}
            onConfirm={handleConfirm}
            datetime={moment(values.datetime)}
            //handleSubmit={handleSubmit}
            maxDate={new Date()}
          />
          <Button
            title="Envoyer"
            color="green"
            onPress={handleSubmit}
            //disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 93,
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 10,
  },
});

export default DateTimeScreen;

// () => {
//   setFieldValue(
//     "mydatetime",
//     moment(new Date(date)).format("YYYY-MMM-DD LT")
//   );
//
