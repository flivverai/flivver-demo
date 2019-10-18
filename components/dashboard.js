import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.paragraph}>Implement-me!</Text>
        </View>
        <View style={styles.footer}>
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
    fontFamily: 'EngraversMT',
    textTransform: 'uppercase',
    //margin: 24,
    //paddingTop: 64,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },  
  paragraph: {
    fontFamily: 'EngraversMT',
    //textTransform: 'uppercase',
    //margin: 24,
    //paddingTop: 64,
    fontSize: 10,
    //fontWeight: 'bold',
    textAlign: 'center',
    color: '#689830',
  },
  logo: {
    height: 64,
    width: 64,
    position: 'absolute',
    zIndex: 1,
    top: Constants.statusBarHeight,
    left: 10,
  },
  header: {
    height: 64,
    width: "100%",
    position: 'absolute',
    zIndex: 1,
    top: Constants.statusBarHeight,
    //backgroundColor: '#689830',
    //left: 10,
  },   
  content: {
    height: Dimensions.get('window').height -40,
    width: "100%",
    position: 'absolute',
    zIndex: 1,
    top: Constants.statusBarHeight + 32,
    backgroundColor: '#fff',
    //left: 10,
  },
  footer: {
    height: 24,
    width: "100%",
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    backgroundColor: '#fff',
    //left: 10,
  }
});
