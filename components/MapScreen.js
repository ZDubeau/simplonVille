import React, { useState, Component } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { API_KEY } from "@env";
import {
  Alert,
  AppRegistry,
  View,
  StyleSheet,
  ToastAndroid,
  Text,
} from "react-native";
import { render } from "react-dom";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 45.188529,
        longitude: 5.724524,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      },
      locationChosen: false,
      marginBottom: 1,
      currentAddress: "",
    };
  }
  componentDidMount() {
    this.handleUserLocation();
    setTimeout(() => this.setState({ marginBottom: 0 }), 100);
  }
  handleUserLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      //console.log(JSON.stringify(pos.coords.latitude, pos.coords.longitude));
      this.map.animateToRegion({
        ...this.state.initialRegion,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      this.setState({
        initialRegion: {
          ...this.state.initialRegion,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
        locationChosen: true,
      });
      this.getAddress(pos.coords.latitude, pos.coords.longitude);
    }),
      (err) => {
        console.log(err);
        Alert.alert("Something was wrong");
      };
  }
  getAddress = async (lat, lng) => {
    const apiKey = process.env["API_KEY"];
    await Geocoder.fallvackToGoogle(apiKey);
    try {
      let res = await Geocoder.geocodePosition({ lat, lng });
      let addr = res[0].formattedAddress;
      this.setState({
        currentAddress: addr,
      });
      {
        this.mark.showCallout();
      }
    } catch (err) {
      alert(err);
    }
  };

  onMarkerDragEnd = (e) => {
    const { coordinate } = e.nativeEvent;
    this.setPosition(coordinate);
  };
  onChangeValue = (initialRegion) => {
    ToastAndroid.show(
      JSON.stringify(this.state.currentAddress),
      ToastAndroid.SHORT
    );
    this.setState({
      initialRegion,
    });
  };

  render() {
    // let marker = (
    //   <MapView.Marker
    //     coordinate={this.state.initialRegion}
    //     ref={(ref) => (this.mark = ref)}
    //     pinColor="purple"
    //   />
    // );
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <MapView
          //provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
            width: 327,
            height: 250,
            marginBottom: this.state.marginBottom,
          }}
          loadingEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={this.state.initialRegion}
          //onRegionChange={(region) => this.setState({ region })}
          onRegionChangeComplete={this.handleUserLocation.getAddress}
          ref={(ref) => (this.map = ref)}
        >
          {/* {marker} */}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -60,
    alignItems: "center",
  },
  map: {
    width: 327,
    height: 250,
  },
});
AppRegistry.registerComponent("MapScreen", () => MapScreen);
// export default MapScreen;
