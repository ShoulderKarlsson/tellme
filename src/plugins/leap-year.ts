import isLeapYear from 'date-fns/is_leap_year'
import addYears from 'date-fns/add_years'
import * as dfns from 'date-fns'

export const leapYearPlugin = {
  description: 'Get information about current or coming leap year',
  commands: {
    long: '--leap-year',
    short: '-l'
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
        ? console.log(` - ${date.getFullYear()}`.green)
        : console.log(` - ${date.getFullYear()}`.magenta)
    })
  }
}