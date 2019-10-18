import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

import Constants from 'expo-constants';
import { Font } from 'expo';
import { Button, Card, Divider, Provider } from 'react-native-paper';

export default class HomeCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          WELCOME TO FLIVVER
        </Text>
        <View style={styles.content}>
          <Text style={styles.paragraph}>Products delivered to your door</Text>
        </View>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#689830',
    //padding: 8,
    marginBottom: 0,
    border: 'none',
  },
  title: {
    position: 'absolute',
    fontFamily: 'EngraversMT',
    textTransform: 'uppercase',
    //margin: 24,
    width: "100%",
    top: Constants.statusBarHeight,
    paddingTop: 64,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  paragraph: {
    fontFamily: 'Hammer',
    //textTransform: 'uppercase',
    //margin: 24,
    paddingTop: 64,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#689830',
  },
  content: { 
    flex: 1, 
    zIndex: 1,
    width: "100%", 
    height: Dimensions.get('window').height/2,
    position: 'absolute',
    backgroundColor: 'white', 
    top: "50%",
    paddingTop: 64,
    //marginTop:70 
  },
  logo: {
    height: 128,
    width: 128,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    margin: -64,
  }
});
