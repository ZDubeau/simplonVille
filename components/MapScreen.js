import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 45.188529,
    longitude: 5.724524,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 350,
    height: 300,
  },
});
