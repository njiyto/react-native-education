import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry';

export default function Main() {
  return (
    <View>
      <Text>lalayour app!</Text>
      <Ionicons name="ios-pizza" color="red" size={100} />
      <AddEntry />
    </View>
  );
}
