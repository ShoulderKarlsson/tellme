import colors from 'colors'
import getISOWeek from 'date-fns/get_iso_week'
import startOfWeek from 'date-fns/start_of_iso_week'
import eachDay from 'date-fns/each_day'
import endOfISOWeek from 'date-fns/end_of_iso_week'
import format from 'date-fns/format'
import * as dfns from 'date-fns'

export const weekPlugin = {
  description: 'Display week current weeknumber with additional information',

  command: {
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