import * as React from 'react';
import { View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';
import { Font } from 'expo';

import FlivverMenu from './components/flivver_menu';

const flivverTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    primary: '#689930',
    accent: '#ffffff',
    paper: '#689930',
    text: '#689930',
    background: '#FFFFFF',
    disabled: '#C0C0C0',
    placeholder: "#C0C0C0",
  }
};

export default class App extends React.Component {
  async componentDidMount() {
    console.log('AppDidMount!!!', this.state.myCard);
    await Font.loadAsync({
      EngraversMT: require('./assets/fonts/EngraversMT.woff'),
    });
  }
  render() {
    console.log('Begin the App!!!');
    return (
      <PaperProvider theme={flivverTheme}>
      <View style={{ flex: 1 }}>
        <FlivverMenu/>
      </View>
      </PaperProvider>
    );
  }
}
