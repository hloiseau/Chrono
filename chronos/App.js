import React, { Component } from 'react';
import { Platform, StyleSheet, ProgressBarAndroid, Text, View, TextInput, Button } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});



class ChronoList extends Component{
  constructor(props){
    super(props);
     this.state = {
      chrono: []
    }
  }
 
  willFocusSubscription = this.props.navigation.addListener('willFocus', payload => {
    var params = this.props.navigation.getParam('params')
    if(params){
      this.setState(state => state.chrono.push(params))
    }

  })

  progress(begin, end) {
    begin = new Date(begin);
    end = new Date(end);

    var beginEndDifference = (end.getTime() - begin.getTime()) / (1000 * 3600 * 24);
    var beginTodayDifference = (new Date().getTime() - begin.getTime()) / (1000 * 3600 * 24);

    var progress = ((beginTodayDifference * 100) / beginEndDifference);

    if (progress > 100) {
        return 1;
    }
    else {
        if (progress < 0) { return 0.0 }
        return progress / 100;
    }
  }
  
  
  render(){  
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Comptes à rebours</Text>
      <View style={{flex:1}}>
          <FlatList
            data = {this.state.chrono}
            renderItem= {({item,index,separators}) =>(
            <View  >
              <Text onPress={()=>{  item.show= !item.show; separators.updateProps() }}>{item.label} {item.end}  </Text>
              {item.show && <Button title="Supprimer" onPress={() => this.setState(state=> state.chrono.splice(index,1))} />}
              <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={this.progress(item.begin, item.end)}/>
            </View>)} 
            keyExtractor = {item => item.label}
            style={{flex: 2}}
          />
          <Button title="Ajouter" onPress={() => this.props.navigation.navigate('Add')}/>
           
         
         
      </View>
    </View>
            
    )
  }
}

class ChronoAdd extends Component {
  constructor(props){
    super(props);
     this.state = {
      label: null,
      begin: null,
      end: null,
      
      
    }
  }

  setBeginDate(date) {
    this.setState({ begin:date});
  }
  setEndDate(date) {
    this.setState({ end:date});
  }
  render(){
    return (
      <View style={{flex: 3}}>
      <TextInput placeholder="label" value={this.state.label} onChangeText={(text)=> this.setState(state => state.label = text)} />  
      <DatePicker date={this.state.begin} onDateChange={date => this.setBeginDate(date)} />
      <DatePicker date={this.state.end} onDateChange={date => this.setEndDate(date)} minDate={this.state.begin}/>
      <Button
      title="Ajouter"
      onPress={()=>{ this.props.navigation.navigate("Home", {params:{label: this.state.label, begin: this.state.begin, end: this.state.end, show: false}})}}
    />   
    </View>
    )
  }
}

export default class App extends Component {
  render() {
    return (  
        <AppContainer/>     
    );
  }
}


const AppNavigator = createStackNavigator({
  Home: {
    screen: ChronoList
  },
  Add:{
    screen: ChronoAdd
  }
}, 
{
  initialRouteName:'Home'
})

const AppContainer = createAppContainer( AppNavigator)


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





