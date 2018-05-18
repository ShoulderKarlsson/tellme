import * as colors from 'colors'
// import getISOWeek from 'date-fns/get_iso_week'
import {getISOWeek, startOfWeek, eachDay, endOfISOWeek, format} from 'date-fns'

export const weekPlugin = {
  description: 'Display week current weeknumber with additional information',

  commands: {
    long: '--week',
    short: '-w'
  },

  resolver: () => {
    const d = new Date()
    const currentWeek = getISOWeek(d)
    const startDateOfWeek = startOfWeek(d)
    const endDateOfWeek = endOfISOWeek(startDateOfWeek)
    const weekDates = eachDay(startDateOfWeek, endDateOfWeek)

    console.log(' ')
    console.log(`Current Week is ${currentWeek}. (Dates for this week)`.cyan)
    weekDates
      .map(date => ` - ${format(date, 'Do dddd')}`.magenta)
      .forEach(date => console.log(`${date}`.magenta))
  }
}