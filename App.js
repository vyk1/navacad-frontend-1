import React from "react";
import { Button, Container, Content, Card, CardItem, Body, Text } from "native-base";
// import { Button, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import MapaScreen from './classes/MapaScreen.js'
import SalaInfoScreen from './classes/SalaInfoScreen.js'
import SalasScreen from './classes/SalasScreen.js'
import ServidoresScreen from './classes/ServidoresScreen.js'
import BuscaScreen from './classes/BuscaScreen.js'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ flex: 1 }}> */}
        <Container>
          <Content>
            <Card transparent key={1}>
              <CardItem>
                <Body>
                  <Text>
                    Bem-vindo ao NavAcad
                </Text>
                </Body>
              </CardItem>
            </Card>
            <Button large full primary
              onPress={() =>
                this.props.navigation.push('Mapa')}>
              <Text>Mapa</Text>
            </Button>
            <Button large full dark
              onPress={() =>
                this.props.navigation.push('Salas')}>
              <Text>Salas</Text>
            </Button>
            <Button large full warning
              onPress={() =>
                this.props.navigation.push('Servidores')}>
              <Text>Servidores</Text>
            </Button>
            {/* <Button large full success
              onPress={() =>
                this.props.navigation.push('Busca')}>
              <Text>Buscar</Text> */}
            {/* </Button> */}
          </Content>
        </Container>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Mapa: MapaScreen,
  Salas: SalasScreen,
  SalaInfo: SalaInfoScreen,
  Servidores: ServidoresScreen,
  Busca: BuscaScreen
}, {
  initialRouteName: 'Home',
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
    paddingVertical: 40,
  },
  map: {
    width: "100%",
    height: 400,
  },
  head: { height: 40, backgroundColor: 'black' },
  textHead: { margin: 6, color: 'white' },
  text: { margin: 6, color: 'black' },
  row: { flexDirection: 'row', backgroundColor: 'white' },

});