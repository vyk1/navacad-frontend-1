import React from "react";
import { Container, Content, Card, CardItem, Text } from "native-base";
import { Linking, View, ScrollView } from 'react-native';
import server from '../config/server';
import Msg from "./mini/Msg";

export default class SalaInfoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    console.log(navigation);

    return {
      title: "Sala - " + navigation.getParam(`obj`).nome,
    }

  };

  constructor(props) {
    super(props);
    this.state = {
      params: props.navigation.state.params.obj,
      salaInfo: [],
      loaded: false,
      loaded2: false
    }
  }

  componentDidMount() {
    this.getSalaInfo(this.state.params.id)
  }

  getSalaInfo(id) {

    return fetch(`${server}/salas/${id}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          salasInfo: responseData,
          loaded: true
        })
        console.log(responseData)
      }
      ).done();
  }

  geraArrayDiaSemana(obj) {
    let segunda = [];
    let terça = [];
    let quarta = [];
    let quinta = [];
    let sexta = [];

    obj.map((h, index) => {
      if (h.diaSemana[0] == 1) {
        segunda.push(h);
      }
      else if (h.diaSemana[0] == 2) {
        terça.push(h);
      }
      else if (h.diaSemana[0] == 3) {
        quarta.push(h);
      }
      else if (h.diaSemana[0] == 4) {
        quinta.push(h);
      }
      else if (h.diaSemana[0] == 5) {
        sexta.push(h);
      }
    })
    return [segunda, terça, quarta, quinta, sexta]

    // return (
    //   <Text>{segunda[0 ].id}</Text>
    // )
    console.log(segunda)
    console.log(terça)
    console.log(quarta)
    console.log(quinta)
    console.log(sexta)
  }

  organizaArrayDiaSemana(array) {
    array.map((dia, index) => {
      //jogar para dentro dos cards
      //incluir loaded false enquanto não monta os arrays
      // função?!?!
      dia.map((info, index) => {
        if (info.diaSemana[0] == 1 && array[0].length > 0) {
          console.log('existe e é segunda feira')
        }
        else if (info.diaSemana[0] == 2 && array[1].length > 0) {
          console.log('existe e é terça feira')
        }
        else if (info.diaSemana[0] == 3 && array[2].length > 0) {
          console.log('existe e é quarta feira')
        }
        else if (info.diaSemana[0] == 4 && array[3].length > 0) {
          console.log('existe e é quinta feira')
        }
        else if (info.diaSemana[0] == 5 && array[4].length > 0) {
          console.log('existe e é sexta feira')
        }
      })

    })
  }

  renderizaFuncBySala() {
    let funcionarios = this.state.salasInfo.funcionarios;
    console.log(funcionarios);

    if (funcionarios.length > 0) {
      return (
        funcionarios.map((f, index) => (
          <Card key={f.id}>

            <CardItem header bordered>
              <Text>{f.nome}</Text>
            </CardItem>

            <CardItem bordered>
              <Text onPress={() => {
                Linking.openURL(`mailto:${f.email}`)
              }}
              >{f.email}</Text>
            </CardItem>
            {
              f.horarios.map((info, i) => {
                if (info.diaSemana[0] == 1) {
                  return (
                    <View>
                      <CardItem header >
                        <Text>Segunda-Feira</Text>
                      </CardItem>
                      <CardItem >
                        <Text>{info.inicio} - {info.fim}</Text>
                      </CardItem>
                    </View>
                  );
                }
                else if (info.diaSemana[0] == 2) {
                  return (
                    <View>
                      <CardItem header >
                        <Text>Terça-Feira</Text>
                      </CardItem>
                      <CardItem >
                        <Text>{info.inicio} - {info.fim}</Text>
                      </CardItem>
                    </View>
                  );
                }
                else if (info.diaSemana[0] == 3) {
                  return (
                    <View>
                      <CardItem header >
                        <Text>Quarta-Feira</Text>
                      </CardItem>
                      <CardItem >
                        <Text>{info.inicio} - {info.fim}</Text>
                      </CardItem>
                    </View>
                  );
                }
                else if (info.diaSemana[0] == 4) {
                  return (
                    <View>
                      <CardItem header >
                        <Text>Quinta-Feira</Text>
                      </CardItem>
                      <CardItem >
                        <Text>{info.inicio} - {info.fim}</Text>
                      </CardItem>
                    </View>
                  );
                }
                else if (info.diaSemana[0] == 5) {
                  return (
                    <View>
                      <CardItem header >
                        <Text>Sexta-Feira</Text>
                      </CardItem>
                      <CardItem >
                        <Text>{info.inicio} - {info.fim}</Text>
                      </CardItem>
                    </View>
                  );
                }
              }
              )}
          </Card>
        )))
    } else {
      return (<Text>Não há funcionários cadastrados nesta sala.</Text>)
    }
  }

  render() {
    const { navigation } = this.props;
    if (this.state.loaded) {
      console.log('carrregou:')
      return (
        <Container>
          <ScrollView>
            <Content>
              {this.state.salasInfo.length > 0 ? <Msg texto="Você pode pressionar telefone e e-mail para interagir" /> : <Text></Text>}
              {this.renderizaFuncBySala()}
            </Content>
          </ScrollView>
        </Container>
      )
    } else {
      return (
        <View>
          <Container>
            <Text>Carregando...</Text>
          </Container>
        </View>
      )
    }
  }
}
