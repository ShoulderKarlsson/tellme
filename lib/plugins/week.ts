import chalk from 'chalk'
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
    console.log(chalk.cyan(`Current Week is ${currentWeek}. (Dates for this week)`))
    weekDates
      .map(date => ` - ${format(date, 'Do dddd')}`)
      .forEach(date => console.log(chalk.magentaBright(`${date}`)))
  }
}