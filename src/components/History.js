import React, { useEffect }  from 'react'
import { Text, View } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendar } from './api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

const History = ({ entries }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(entries).length) {
    fetchCalendar()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
    }
  }, [entries])

  const renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      {today
        ? <Text>{JSON.stringify(today)}</Text>
        : <Text>{JSON.stringify(metrics)}</Text>}
    </View>
  )

  const renderEmptyDate = formattedDate => (
    <View>
      <Text>{JSON.stringify(this.props)}</Text>
      <Text>No Data for this day</Text>
    </View>
  )


  return (
    <View>
    <UdaciFitnessCalendar
      items={entries}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
     </View>
  )
}

const mapStateToProps = (entries) => ({
  entries
})

export default connect(mapStateToProps)(History)
