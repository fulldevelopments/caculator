import React from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, Text, Image, View } from 'react-native'

const style = StyleSheet.create({

    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    image: {
        height: Dimensions.get('window').width / 5,
        width: Dimensions.get('window').width / 5,
    },
    workAround: {
        height: Dimensions.get('window').width / 6,
        width: Dimensions.get('window').width / 6,
        backgroundColor: 'white',
    },
    buttonDouble: {
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 2,
    },
    buttonOperation: {
        color: '#fff',
        backgroundColor: '#fa8231'
    }
});

export default props => {
    const stylesButton = [style.button];

    const createType = (props) => {

        if (props.double) stylesButton.push(style.buttonDouble)
        if (props.triple) stylesButton.push(style.buttonTriple)
        if (props.operation) stylesButton.push(style.buttonOperation)

        return props.icon ?
            <View style={stylesButton}>
                <Image style={style.image} source={require('./../../assets/backspace.png')} />
            </View>
            : <Text style={stylesButton}>{props.label}</Text>;
    }

    return (
        <TouchableHighlight disabled={props.label == '=' && props.enabledShowResult} onPress={() => props.onClick(props.label)}>
            {createType(props)}
        </TouchableHighlight>
    )
}

