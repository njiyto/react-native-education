import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import UdaciSteppers from './UdaciSteppers';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from './api';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { white, purple } from '../utils/colors';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn} onPress={onPress}>
    <Text style={styles.textBtn}>SUBMIT</Text>
  </TouchableOpacity>
);


const AddEntry = ({ alreadyLogged, dispatch }) => {
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
    setState(prevState => {
      return {
        ...prevState,
        [metric]: value
      }
      
    })
  }

  const metaInfo = getMetricMetaInfo();

  const submit = () => {
    const key = timeToString();
    const entry = state;

    dispatch(addEntry({
      [key]: entry
    }))

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
    const key = timeToString();

    dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

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
      <View style={styles.center}>
        <Ionicons name={Platform.OS === 'ios' ? "ios-happy" : 'md-happy'} size={100} />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    )
  }


  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='blue' />
      <DateHeader date={(new Date()).toLocaleDateString()} />
      {Object.keys(metaInfo).map(el => {
        const { getIcon, type, ...rest } = metaInfo[el];
        const value = state[el];

        return (
          <View key={el} style={styles.row}>
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

const mapStateToProps = (state) => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginRight: 40,
    marginLeft: 40
  },
  androidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  textBtn: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
});