import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Conditional from './Conditional';

const styles = StyleSheet.create({
    display: {
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 50,
        color: '#fff',
    }

});

export default props => {

    const createCalculation = (props) => {
        return (
            <View>
                <Conditional valid={props.first != null} value={props.first} />
                <Conditional valid={!!props.operation} value={props.operation} />
                <Conditional valid={props.second != null} value={props.second} />
            </View>
        );
    }

    return (
        <View style={styles.display}>
            {createCalculation(props)}
            <Text numberOfLines={2} style={styles.displayValue}>{props.displayValue}</Text>
        </View>
    )
}