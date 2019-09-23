import React from "react";
import { Text, Container, Content, Header, Item, Input, Card, CardItem, Button } from 'native-base';
import { ScrollView } from 'react-native';
import server from '../config/server';
import Msg from "./mini/Msg";

export default class SalasScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        console.log(navigation);
        return {
            title: "Busca do Tipo: " + navigation.getParam(`obj`).tipo,
        }
    };

    constructor() {
        super();
        this.state = {
            term: "",
            response: []
        }
    }
    componentDidMount() {
        this.buscar()
    }

    buscar(tipo = this.props.navigation.state.params.obj.tipo, valor = this.state.term) {

        return fetch(`${server}/${tipo}/search?nome=${valor}`)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    response: responseData,
                })
                console.log(responseData)
            }
            ).done();

    }

    renderizaSala() {
        if (this.state.response.length > 0) {
            return (
                this.state.response.map((rowData, index) => (
                    <Card key={rowData.id}>

                        <CardItem header bordered>
                            <Text>{rowData.nome}</Text>
                        </CardItem>

                        <CardItem bordered>
                            <Text>{rowData.telefone}</Text>
                        </CardItem>

                        <CardItem bordered>
                            <Text>{rowData.email}</Text>
                        </CardItem>
                        <CardItem bordered header button
                            onPress={() => {
                                let obj = { "nome": rowData.nome, "id": rowData.id }
                                this.props.navigation.navigate(
                                    'SalaInfo',
                                    { obj }
                                )
                            }}
                        >
                            <Text>Visitar</Text>
                        </CardItem>
                    </Card>
                )
                )
            )
        } else {
            if (this.state.term) {
                return (<Text>Não foram encontrados registros com o parâmetro acima</Text>)
            } else {
                return (<Text>Digite sua pesquisa</Text>)
            }
        }
    }
    renderizaServidor() {
        if (this.state.response.length > 0) {
            return (
                this.state.response.map((rowData, index) => (
                    <Card key={rowData.id}>

                        <CardItem header bordered>
                            <Text>{rowData.nome}</Text>
                        </CardItem>

                        <CardItem bordered>
                            <Text onPress={() => {
                                Linking.openURL(`mailto:${rowData.email}`)
                            }}
                            >{rowData.email}</Text>
                        </CardItem>
                        <CardItem bordered header button
                            onPress={() => {
                                let obj = { "nome": rowData.sala.nome, "id": rowData.sala.id }
                                this.props.navigation.navigate(
                                    'SalaInfo',
                                    { obj }
                                )
                            }}
                        >
                            <Text>Visitar</Text>
                        </CardItem>
                    </Card>
                )
                )
            )
        } else {
            if (this.state.term) {
                return (<Text>Não foram encontrados registros com o parâmetro acima</Text>)
            } else {
                return (<Text>Digite sua pesquisa</Text>)
            }
        }
    }

    render() {
        let tipo = this.props.navigation.state.params.obj.tipo;

        if (tipo == 'Salas') {
            return (
                <Container>
                    <ScrollView>
                        <Content>
                            <Header searchBar rounded>
                                <Item>
                                    <Input
                                        placeholder="Search"
                                        value={this.state.term}
                                        onChangeText={(term) => { this.setState({ term }) }}
                                    />
                                </Item>
                            </Header>
                            <Button large full primary
                                onPress={() => this.buscar()}>
                                <Text>Buscar!</Text>
                            </Button>
                            <Msg texto="Você pode pressionar telefone e e-mail para interagir" />
                            {this.renderizaSala()}
                        </Content>
                    </ScrollView>
                </Container>
            )
        } else {
            //se for servidor
            return (
                <Container>
                    <ScrollView>
                        <Content>
                            <Header searchBar rounded>
                                <Item>
                                    <Input
                                        placeholder="Buscar"
                                        value={this.state.term}
                                        onChangeText={(term) => this.setState({ term })}
                                    />
                                </Item>
                            </Header>
                            <Button large full primary
                                onPress={() => this.buscar()}>
                                <Text>Buscar!</Text>
                            </Button>
                            <Msg texto="Você pode pressionar telefone e e-mail para interagir" />
                            {this.renderizaServidor()}
                        </Content>
                    </ScrollView>
                </Container>
            )

        }



    }
}
