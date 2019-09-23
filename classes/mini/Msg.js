import React from "react";
import { Button, Container, Content, Card, CardItem, Text } from "native-base";

export default class Msg extends React.Component {
    render() {
        return (

            <Card>
                <CardItem>
                    <Text>{this.props.texto}
                    </Text>
                </CardItem>
            </Card>
        )
    }
}
