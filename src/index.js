import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import Live from './components/Live';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
// import History from './components/History'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const Main = () => {
  return (
    <Provider store={createStore(reducer)}>
      <AddEntry />
    </Provider>
  );
}


const TabNavigator = createBottomTabNavigator({
  Home: Main,
  Live: Live,
});

export default createAppContainer(TabNavigator);