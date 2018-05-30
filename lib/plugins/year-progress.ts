import {Plugin} from '../entities'
import {getDayOfYear, isLeapYear} from 'date-fns'
import ProgressBar from 'progress'

export const yearProgressionPlugin: Plugin = {
  description: 'Display progress bar for year progression',
  commands: {
    long: '--progress',
    short: '-p'
  },
  resolver: () => {
    const passedDays = getDayOfYear(new Date())
    const daysOfYear = isLeapYear(new Date()) ? 366 : 365
    const percentage = Math.round((passedDays / daysOfYear) * 100)
    const bar = getProgressbar({daysOfYear})
    console.log(percentage)
    // let currentProgress = 0

    while(bar.curr !== percentage) {
      bar.tick(1)
      // currentProgress++
    }



    // console.log(Object.keys(bar))
  }
}


const getProgressbar = ({daysOfYear}) => {
  const barConfig = {
    complete: '=',
    incomplete: '',
    width: 100,
    total: daysOfYear
  }

  return new ProgressBar(' > Yearly Progress [:bar] ', barConfig)
}
