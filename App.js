
import React from 'react';
import { SafeAreaView, StyleSheet, View, } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default class App extends React.Component {

  state = {
    displayValue: '0',
    operation: '',
    index: 0,
    values: [null, null],
    continue: false,
    calculation: {},
    enabledShowResult: false
  }


  addValueMap = (newValueDisplay) => {
    const values = [...this.state.values];

    const index = this.state.operation ? 1 : 0;

    values[index] = parseFloat(newValueDisplay);

    this.setState({
      index,
      values
    });
  }

  addDigit = number => {

    if (number == '.' && this.state.displayValue.search('.')) {
      return;
    }

    let displayValue = this.state.displayValue;

    if (this.state.continue) {
      this.setState({ continue: false });
      displayValue = number;
    } else {
      displayValue = this.verifyFirstDigit()
        && displayValue == '0'
        ? number == '.' ? '0.' : number
        : displayValue.concat(number)
    }


    this.setState({ displayValue, enabledShowResult: true });

    this.addValueMap(displayValue);
  }

  clearMemory = () => {
    this.setState({ displayValue: '0', operation: '', values: [null, null], index: 0 });
  }

  calculate = () => {
    try {

      const porcento = this.state.operation == '%';
      const value1 = parseFloat(this.state.values[!porcento ? 0 : 1]);
      const value2 = parseFloat(this.state.values[!porcento ? 1 : 0]);

      const calculate = String(eval(`${value2} ${!porcento ? this.state.operation : '*'} ${porcento ? parseFloat(value1 / 100) : value1}`));
      this.setState({ displayValue: calculate, values: [calculate, null], index: 0, continue: true });
    } catch (error) {
      console.log(erro);
    }
  }

  clearDisplay = () => {
    this.setState({ displayValue: '0' });
  }

  setOperation = (operation) => {

    if (!this.state.values.includes(null)) {
      this.calculate();
    } else if (operation && !this.state.values[1]) {
      this.clearDisplay();
    }

    this.setState({ operation });
  }

  verifyFirstDigit = () => {
    return [0, 1].includes(this.state.displayValue.length);
  }

  clearDigit = () => {
    this.setState({ displayValue: this.verifyFirstDigit() ? '0' : this.state.displayValue.substr(0, this.state.displayValue.length - 1) });
  }

  showResult = () => {
    this.calculate();
    this.setState({ continue: false, operation: '', enabledShowResult: false });
    this.clearDisplay();
  }

  render() {
    return (

      <SafeAreaView style={styles.Container} >
        <Display displayValue={!this.state.clearDisplay ? this.state.displayValue : '0'} first={this.state.values[0]} operation={this.state.operation} second={this.state.values[1]} />
        <View style={styles.buttons}>
          <Button label='AC' onClick={this.clearMemory} operation={true} />
          <Button label='/' onClick={this.setOperation} operation={true} />
          <Button label='%' onClick={this.setOperation} operation={true} />
          <Button icon={true} onClick={this.clearDigit} operation={true} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' onClick={this.setOperation} operation={true} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' onClick={this.setOperation} operation={true} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' onClick={this.setOperation} operation={true} />
          <Button label='0' onClick={this.addDigit} double={true} />
          <Button label='.' onClick={this.addDigit} />
          <Button enabled={this.state.enabledShowResult} label='=' onClick={this.showResult} operation={true} />
        </View>
      </SafeAreaView>
    );
  }
}