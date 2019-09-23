import React from "react";
import { Button, Container, Content, Card, CardItem, Text } from "native-base";
import { ScrollView, Linking } from 'react-native';
import server from '../config/server';
import Msg from "./mini/Msg";

export default class SalasScreen extends React.Component {
  static navigationOptions = {
    title: 'Salas - Todas as Salas',
  };
  constructor() {
    super();
    this.state = {
      salas: [],
      loaded: false
    }
  }
  componentDidMount() {
    this.getSalas()
  }
  getSalas() {
    return fetch(`${server}/salas`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          salas: responseData,
          loaded: true
        })
        console.log(responseData)
      }
      ).done();
  }

  Obj(id, title, ) {
    this.id = id;
    this.title = title;
  }

  render() {

    // if(this.state.loaded)
    return (
      <Container>
        <ScrollView>
          <Content>
            <Button large full primary
              onPress={() => {
                let obj = { "tipo": "Salas" }
                this.props.navigation.navigate(
                  'Busca',
                  { obj }
                )
              }}>
              <Text>Buscar Salas</Text>
            </Button>
            {this.state.salas.length > 0 ? <Msg texto="Você pode pressionar telefone e e-mail para interagir" /> : <Text></Text>}
            {
              this.state.salas.map((rowData, index) => (

                <Card key={rowData.id}>

                  <CardItem header bordered>
                    <Text>{rowData.nome}</Text>
                  </CardItem>

                  <CardItem bordered>
                    <Text onPress={() => {
                      Linking.openURL(`tel:${rowData.telefone}`)
                    }}
                    >{rowData.telefone}</Text>
                  </CardItem>

                  <CardItem bordered>
                    <Text onPress={() => {
                      Linking.openURL(`mailto:${rowData.email}`)
                    }}
                    >{rowData.email}</Text>
                  </CardItem>
                  <CardItem bordered header button
                    onPress={() => {
                      let obj = { "nome": rowData.nome, "id": rowData.id }
                      // Alert.alert(`This is row ${rowData.id}`);
                      this.props.navigation.navigate(
                        'SalaInfo',
                        { obj }
                      )
                    }}
                  >
                    <Text>Visitar</Text>
                  </CardItem>

                </Card>
              ))
            }
          </Content>
        </ScrollView>
      </Container>
    )
  }
}
