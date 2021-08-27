import React from "react";
import { Formik, form } from "formik";
import { Alert, Button, StyleSheet, View, TextInput, Text } from "react-native";
const Formiko = () => (
  <View>
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />

          <TextInput
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />

          <Button onPress={handleSubmit} disabled={isSubmitting}></Button>
        </form>
      )}
    </Formik>
  </View>
);
export default Formiko;
