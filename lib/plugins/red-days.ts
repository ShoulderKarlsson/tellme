import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'

import {Plugin} from '../entities'

export const redDaysPlugin: Plugin = {
  description: "Displays information about 'red days'",
  commands: {
    long: '--red-days',
    short: '-r',
  },

  resolver: async () => {
    const html = await fetchPage('http://www.kalender.se/helgdagar').catch(
      (error: any) => {
        console.log(error)
      }
    )

    const information = parseHtml(html)

    present(information)
  },
}

const present = (information: any) => {
  console.log(information)
}

const fetchPage = (url: string) =>
  fetch(url)
    .then(
      (response: any) => (response.ok ? response : Promise.reject(response))
    )
    .then((response: any) => response.text())

const parseHtml = (html: any) => {
  const data = cheerio.load(html)
  const info = data('.table-striped')
    .children('tbody')
    .children('tr')

  return info
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
    .toArray()
}
