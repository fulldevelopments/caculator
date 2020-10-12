import React from 'react';
import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
    fontResult: {
        fontSize: 25
    }
})
export default (props) => {
    return props.valid ? <Text style={style.fontResult}>{props.value}</Text> : false;
}