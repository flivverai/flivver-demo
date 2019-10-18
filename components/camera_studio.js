import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



export default class CameraStudio extends React.Component {
  state = {
    image: null,
    uploading: false,
    modalVisible: false,
  };
  
  // ir - image recognition will hold the image url in the backend and the AI result
  ir = {
    product: "Unkown",
    message: "Error: Not Working!",
    price: 0,
    url: "https://www.freeiconspng.com/uploads/error-icon-28.png",
    location: "https://ricardofilipo.com",
    itens:[{name:"None 1", rate: 0},{name:"None 2", rate: 0}]
  };
  
  render() { 
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
       <View style={styles.header}>
        <Text style={styles.title} >
          AI
        </Text>
       </View> 
       <View style={styles.content}>
        <View style={{flex: 1}}>
        {this._maybeRenderControls()}
        {this._maybeRenderUploadingIndicator()}
        {this._maybeRenderImage()}
        </View>
       </View> 
        <StatusBar barStyle="default" />
      </View>
      
    );
  }
  
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _maybeRenderUploadingIndicator = () => {
    if (this.state.uploading) {
      return ( 
      <View>
        <ActivityIndicator animating size="large" />
        <Text>Uploading ...</Text>
      </View> 
      );
    }
  };

  _maybeRenderControls = () => {
    if (!this.state.uploading) {
      return (
        <View style={styles.content}>
          <View style={{ 
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
             //alignItems: 'center',
              paddingHorizontal: 30, 
              width: "100%",
              }}>
            <TouchableOpacity onPress={this._pickImage} style={{width:100, padding:10, paddingLeft:30, flex:1}}>
              <Image source={require('../assets/icons/bag.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._takePhoto} style={{width:100, padding:10, flex:1}}>
              <Image source={require('../assets/icons/camera.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    if (this.state.image) {
      //this._setModalVisible(true);
      return (
        /*
        <View
          style={{
            position: "absolute",
            top: 0,
            marginTop: 30,
            width: 250,
            borderRadius: 3,
            elevation: 2,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
          }}>
          */
          <View style={styles.container}>
          <View
            style={{
              //borderTopRightRadius: 3,
              //borderTopLeftRadius: 3,
              //overflow: 'hidden',
              //flex:1,
              width:"100%",
            }}>
            <Image
              source={{ uri: this.state.image }}
              style={{ 
                width: 250, 
                height: 250,  
                marginLeft: (Dimensions.get('window').width -250)/2,
                marginTop: 10,
              }}
            />
          </View>
          <Text style={styles.paragraph}>{this.ir.message} </Text>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonUnit}>
             <Button title="Buy"    
               onPress={() => {
                this.setState({ image: false });
               }}
             />
            </View>
            <View style={styles.buttonUnit}>
             <Button title="Close"    
               onPress={() => {
                this.setState({ image: false });
               }}
             />
            </View>
          </View>
        </View>
      );
    }
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _askPermission = async (type, failureMessage) => {
    const { status, permissions } = await Permissions.askAsync(type);

    if (status === 'denied') {
      alert(failureMessage);
    }
  };

  _takePhoto = async () => {
    await this._askPermission(
      Permissions.CAMERA,
      'We need the camera permission to take a picture...'
    );
    await this._askPermission(
      Permissions.CAMERA_ROLL,
      'We need the camera-roll permission to read pictures from your phone...'
    );
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    await this._askPermission(
      Permissions.CAMERA_ROLL,
      'We need the camera-roll permission to read pictures from your phone...'
    );
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.ir = uploadResult;
        this.setState({ image: uploadResult.location });
        //alert("Found!"+uploadResult);
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  //let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
  //let apiUrl = 'http://kobkob.org:3000/upload';
  let apiUrl = 'https://15d78cf2.ngrok.io/upload';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}

// styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 5,
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#689830',
    //backgroundColor: '#fff',
    width:"100%",
    height: Dimensions.get('window').height -40,
    marginBottom: 0,
    border: 'none',
    //padding:20,
    //padding: (Dimensions.width - 250)/2,
    zIndex:100
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
  /*  
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
  */
  logo: {
    height: 64,
    width: 64,
    position: 'absolute',
    zIndex: 100,
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
    paddingTop: 20,
    backgroundColor: '#fff',
    //left: 10,
  },
  buttonContainer: {
    //position: 'absolute',
    //bottom:40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUnit: {
    flex: 1,
  }
  /*   
  footer: {
    height: 24,
    width: "100%",
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    backgroundColor: '#fff',
    //left: 10,
  }
  */
});