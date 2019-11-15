import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

class ChronoList extends React.Component{
  constructor(props){
    super(props);
     this.state = {
      chrono: [],
      label: null,
      begin: null,
      end: null
      
    }
  }

  labelChange = (event) => {
    let value = event.target.value;
    this.setState(state => state.label = value);
  }
  beginChange = (event) => {
    let value = event.target.value;
    this.setState(state => state.begin = value);
  }
  endChange = (event) => {
    let value = event.target.value;
    this.setState(state => state.end = value);
  }
  formSubmit = (event) => {
    this.setState(state => state.chrono.push({label: state.label, begin: state.begin, end: state.end}))
    event.preventDefault();
  }
  render(){
    const showList = this.state.chrono.map((element,index) => {
      return <li id={index} onClick={this.handleClick}>{element.name}</li>
  } )
    return (
      <div style={{display: "flex"}}>
                <div>
                    <form onSubmit={this.formSubmit}>
                        <TextInput value={this.state.label} onChangeText={this.labelChange} />
                        <Button OnPress={this.show()} title="Selectionner la date de début"/>
    
                    </form>
                    <ul>
                        {showList}
                    </ul>
                </div>
            </div>
            { this.state.show && <DateTimePicker value={new Date().getDate()} mode="date" display="default" onChange={this.setDate} />}
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Comptes à rebours</Text>
        <ScrollView>
          <ChronoList/>
        </ScrollView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'auto',
    justifyContent: 'flex-start',
    marginTop: 30,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});





