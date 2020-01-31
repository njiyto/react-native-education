import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSteppers from './UdaciSteppers';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from './api'; 

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
);


export default function AddEntry ({ alreadyLogged }) {
  const [state, setState] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  });

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    setState((prevState => {
      const count = prevState[metric] + step;
      return {
        ...prevState,
        [metric]: count > max ? max : count
      }
    }))
  }

  const decrement = (metric) => {
    setState((prevState => {
      const count = prevState[metric] - getMetricMetaInfo(metric).step;
      return {
        ...prevState,
        [metric]: count < 0 ? 0 : count
      }
    }))
  }

  const slide = (metric, value) => {
    setState({[metric]: value})
  }

  const metaInfo = getMetricMetaInfo();

  const submit = () => {
    const key = timeToString();
    const entry = state;

    setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    submitEntry({ key, entry })
  }

  const reset = () => {
    const key = timeToString()
    setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    removeEntry(key)
  }

  if (alreadyLogged) {
    return (
      <View>
        <Ionicons name="ios-happy" size={100} />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    )
  }


  return (
    <View>
      <DateHeader date={(new Date()).toLocaleDateString()} />
      {Object.keys(metaInfo).map(el => {
        const { getIcon, type, ...rest } = metaInfo[el];
        const value = state[el];

        return (
          <View key={el}>
            {getIcon()}
            {type === 'sliders'
              ? <UdaciSlider
                  value={value}
                  onChange={(value) => slide(el, value)}
                  {...rest}
                />
              : <UdaciSteppers
                  value={value}
                  onIncrement={() => increment(el)}
                  onDecrement={() => decrement(el)}
                  {...rest}
                />
            }
          </View>
        )
      })}
      <SubmitBtn onPress={submit}/>
    </View>
  )
}