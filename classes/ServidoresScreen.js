import React from "react";
import { Button, Container, Content, Card, CardItem, Body, Text } from "native-base";
import server from '../config/server';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import Msg from "./mini/Msg";

export default class ServidoresScreen extends React.Component {
    static navigationOptions = {
        title: 'Servidores - Todos os Servidores',
    };
    constructor() {
        super();
        this.state = {
            servidores: [],
            loaded: false
        }
    }
    componentDidMount() {
        this.getServidores()
    }
    getServidores() {

        return fetch(`${server}/servidores`)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    servidores: responseData,
                })
                console.log(responseData)
            }
            ).done();
    }
    renderizaServidores() {
        if (this.state.servidores.length > 0) {
            return (
                this.state.servidores.map((rowData, index) => (
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
            return (<Text>Não foram encontrados servidores</Text>)
        }
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <Content>
                        <Button large full primary
                            onPress={() => {
                                let obj = { "tipo": "Servidores" }
                                this.props.navigation.navigate(
                                    'Busca',
                                    { obj }
                                )
                            }}>
                            <Text>Buscar Servidores</Text>
                        </Button>
                        {this.state.servidores.length > 0 ? <Msg texto="Você pode pressionar telefone e e-mail para interagir" /> : <Text></Text>}
                        {
                            this.renderizaServidores()
                        }
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}