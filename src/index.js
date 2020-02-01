import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

export default function Main() {
  return (
    <Provider store={createStore(reducer)}>
      <AddEntry />
    </Provider>
  );
}
