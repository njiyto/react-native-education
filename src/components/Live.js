import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, Animated } from 'react-native'
import { Location } from 'expo';

export default class Live extends React.Component {
  state = {
    bounce: new Animated.Value(1)
  }

  componentDidMount() {
    Animated.sequence([
          Animated.timing(this.state.bounce, { duration: 200, toValue: 2.04}),
          Animated.spring(this.state.bounce, { toValue: 1, friction: 4})
        ]).start()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Text
            style={{transform: [{scale: this.state.bounce}]}}>
              OLALA
          </Animated.Text>
      </View>
    )
  }
}
