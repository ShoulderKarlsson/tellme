import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'
import {Plugin, Result, ResultTypes, Fail, Success} from '../entities'
import {success, fail, presentFailure, pipe} from '../helpers'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import chalk from 'chalk'

type TransformedData = Array<{
  date: string
  dayName: string
}>

export const redDaysPlugin: Plugin = {
  description: "Displays information about 'red days'",
  commands: {
    long: '--red-days',
    short: '-r'
  },

  resolver: async () => {
    const result: Result = await fetchPage('http://www.kalender.se/helgdagar')

    if (result.type === ResultTypes.Fail) return presentFailure(result)

    const transformData = pipe(collectHtmlData, transform)
    pipe(transformData, present)(result.data)
  }
}

const present = (redDaysData: TransformedData): void => {
  redDaysData.forEach(({date, dayName}) => {
    const daysLeft = differenceInCalendarDays(date, new Date())
    daysLeft >= 0
      ? console.log(
          chalk.yellow(`${date} - ${dayName}. ${daysLeft} days left.`)
        )
      : console.log(chalk.red(`${date} - ${dayName}`))
  })
}

const transform = (htmlData: Array<Array<string>>): TransformedData =>
  htmlData.reduce((acc, curr) => {
    const [date, dayName] = curr
    return [...acc, {date, dayName}]
  }, []) as TransformedData

const fetchPage = (url: string): Promise<Result> => {
  return fetch(url).then(
    async (response: any) =>
      response.ok
        ? success(await response.text())
        : fail('Failed to fetch calender page', 'redDaysPlugin', response)
  )
}

const collectHtmlData = (html: string): Array<Array<string>> => {
  const data = cheerio.load(html)
  const info = data('.table-striped')
    .children('tbody')
    .children('tr')

  const redDaysdata = info
    .map((i, element: CheerioElement) => {
      const result = element.children
        .filter(element => element.name === 'td')
        .map(({children}) => children)
        .reduce((acc, curr) => [...acc, ...curr], [])
        .reduce((acc, curr) => {
          if (curr.name === 'a') {
            const [aTag] = curr.children
            return [...acc, aTag.data]
          }
          if ('data' in curr && curr.data.trim() !== '') {
            return [...acc, curr.data]
          }

          return acc
        }, [])

      // Putting each entry inside array
      // so we can process as a unit
      return [result]
    })
    .toArray() as Array<any>

  // First array is empty, removing this
  return redDaysdata.filter(redDaysInformation => redDaysInformation.length)
}
