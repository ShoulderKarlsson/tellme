import chalk from 'chalk'
import {
  getISOWeek,
  startOfISOWeek,
  eachDay,
  endOfISOWeek,
  format,
  isToday
} from 'date-fns'
import {Plugin} from '../entities'

export const weekPlugin: Plugin = {
  description: 'Display week current weeknumber with additional information',

  commands: {
    long: '--week',
    short: '-w'
  },

  resolver: (): void => {
    const d = new Date()
    const currentWeek = getISOWeek(d)
    const startDateOfWeek = startOfISOWeek(d)
    const endDateOfWeek = endOfISOWeek(startDateOfWeek)
    const weekDates = eachDay(startDateOfWeek, endDateOfWeek)

    console.log(' ')
    console.log(
      chalk.cyan(`Current Week is ${currentWeek}, dates for this week`)
    )
    weekDates
      .map(date => ` - ${format(date, 'Do dddd')}`)
      .forEach(date => console.log(chalk.magentaBright(`${date}`)))
  }
}
