import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';


import CameraStudio from './camera_studio';
import HomeScreen from './homecard';
import Dashboard from './dashboard';
import Cart from './cart';
import Search from './search';

export default class FlivverMenu extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: require('../assets/icons/home.png') },
      { key: 'cart', title: 'Cart', icon: require('../assets/icons/cartF.png') },
      { key: 'camera', title: 'Camera', icon: require('../assets/icons/camera.png') },
      { key: 'search', title: 'Search', icon: require('../assets/icons/search.png') },
      { key: 'dashboard', title: 'Dashboard', icon: require('../assets/icons/write.png') },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    cart: Cart,
    camera: CameraStudio,
    search: Search,
    dashboard: Dashboard,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
