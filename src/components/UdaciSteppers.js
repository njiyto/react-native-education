import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome,  Entypo } from '@expo/vector-icons'
import { white, purple } from '../utils/colors'

const UdaciSteppers = ({ value, max, step, onIncrement, onDecrement, unit }) => {
  const btnStyle = Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn;
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[btnStyle, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]} onPress={onDecrement}>
          <FontAwesome name="minus" size={30} color={Platform.OS === 'ios' ? purple : white} />
        </TouchableOpacity>
        <TouchableOpacity style={[btnStyle, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]} onPress={onIncrement}>
          <FontAwesome name="plus" size={30} color={Platform.OS === 'ios' ? purple : white} />
        </TouchableOpacity>
      </View>
      <View style={styles.metric}>
        <Text style={{fontSize: 24}}>{value}</Text>
        <Text style={{fontSize: 18, color: 'gray'}}>{unit}</Text>
      </View>
    </View>
  )
}

export default UdaciSteppers

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,

  },
  metric: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})