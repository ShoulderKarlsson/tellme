import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'
import {Plugin, Result, ResultTypes, Fail, Success} from '../entities'
import {success, fail, presentFailure, pipe} from '../helpers'

export const redDaysPlugin: Plugin = {
  description: "Displays information about 'red days'",
  commands: {
    long: '--red-days',
    short: '-r'
  },

  resolver: async () => {
    const result: Result = await fetchHtmlData(
      'http://www.kalender.se/helgdagar'
    )

    if (result.type === ResultTypes.Fail) {
      return presentFailure(result)
    }

    const transformedData = pipe(
      collectHtmlData,
      transform
    )(result.data)


  }
}


const transform = (htmlData: Array<Array<string>>) => htmlData
  .reduce((acc, curr) => {



    return acc
  }, [])


const fetchHtmlData = (url: string): Promise<Result> => {
  return fetch(url).then(
    async (response: any) =>
      response.ok
        ? success(await response.text())
        : fail('Failed to fetch calender page', 'redDaysPlugin', response)
  )
}

const collectHtmlData = (html: string) => {
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
