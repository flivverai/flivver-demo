import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal  } from 'react-native';
//import Camera from 'react-native-camera';
//import ImagePicker from 'react-native-image-picker';
import { Camera, Permissions } from 'expo';

export default class Studio extends React.Component {




state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    visible: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ padding: 30 }} onPress={() => this.setState({visible: true})}>
            <Text>Open modal</Text>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={false}
            visible={this.state.visible}
            onRequestClose={() => this.setState({visible: false})}
          >
            <View style={{flex: 1}}>
              <Camera style={{ flex: 1 }} type={this.state.type}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    padding: 30,
                  }}>
                  <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                    onPress={() => {
                      this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
                      });
                    }}>
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                      {' '}Flip{' '}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({visible: false})}>
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                      {' '}Cose modal{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          </Modal>
        </View>
      );
    }
  }



/*
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Flivver
        </Text>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
         <Text style={styles.paragraph}>
          I am the Camera
        </Text>     
      </View>
    );
  }
  */
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    //backgroundColor: RGB(80, 164, 51),
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 64,
    width: 64,
    position:'absolute',
    top:0,
    left:0
  }
});
