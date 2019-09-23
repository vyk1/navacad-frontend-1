import React from "react";
import MapView from 'react-native-maps';
// import { Button, StyleSheet, View, ScrollView, Alert } from 'react-native';
import server from '../config/server';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import Msg from "./mini/Msg";

export default class MapaScreen extends React.Component {

  static navigationOptions = {
    title: 'Mapa',
  };

  constructor() {
    super();
    this.state = {
      markers: [],
      loaded: false,
    }
  }

  componentDidMount() {
    this.getLocations()
  }

  getLocations() {

    return fetch(`${server}/markers`)
      .then(response => response.json())
      .then(responseData => {
        var markers = [];

        for (var i = 0; i < responseData.length; i++) {
          if (responseData[i] != '<Null>') {
            var coords = responseData[i];

            var marker = {
              coordinate: {
                latitude: parseFloat(coords.latitude),
                longitude: parseFloat(coords.longitude),
              },

              info: {
                description: coords.descricao,
                title: coords.titulo
              }
            }
            markers.push(marker);
          }

        }
        console.log(markers);

        this.setState({
          markers: markers,
          loaded: true,
        });
      }
      ).done();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ScrollView style={StyleSheet.absoluteFill}
          contentContainerStyle={styles.scrollview}
        >
            <Msg texto="Você pode obter mais informações clicando nos marcadores" />

          <MapView
            style={styles.map}
            mapType="satellite"
            initialRegion={{
              latitude: -28.279837,
              longitude: -53.515627,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
            zoom={20}
            showsUserLocation={true}>

            {this.state.markers.map((marker, i) => (
              <MapView.Marker
                pinColor={'tomato'}
                key={i}
                coordinate={marker.coordinate}
                title={marker.info.title}
                description={marker.info.description}
              />

            ))}
          </MapView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
  },
  map: {
    width: "100%",
    height: 500,
    flex: 1
  }
});