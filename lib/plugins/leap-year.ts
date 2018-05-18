import isLeapYear from 'date-fns/is_leap_year'
import addYears from 'date-fns/add_years'
import chalk from 'chalk'
import {Plugin} from '../entities'

export const leapYearPlugin: Plugin = {
  description: 'Get information about current or coming leap year',
  commands: {
    long: '--leap-year',
    short: '-l',
  },
  resolver: () => {
    const now = new Date()
    const years = [
      addYears(now, 2),
      addYears(now, 1),
      now,
      addYears(now, -1),
      addYears(now, -2),
    ]

    years.forEach(date => {
      isLeapYear(date)
        ? console.log(chalk.cyanBright(` - ${date.getFullYear()}`))
        : console.log(chalk.magentaBright(` - ${date.getFullYear()}`))
    })
  },
}
