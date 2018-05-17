import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'

//These can be removed later when HTML file is no longer used
import fs from 'fs'
import path from 'path'

export const redDaysPlugin = {
  description: 'Displays information about \'red days\'',
  commands: {
    long: '--red-days',
    short: '-r',
  },

  resolver: async () => {
    // const html = await fetchPage('http://www.kalender.se/helgdagar')
    //   .catch(error => {
    //     console.log(error)
    //   })

    const html = fs.readFileSync(path.join(__dirname, 'info.html'))

    const information = parseHtml(html)

    present(information)
  }
}

const present = information => {

}


const fetchPage = url => fetch(url)
  .then(response => response.ok ? response : Promise.reject(response))
  .then(response => response.text())


const parseHtml = html => {
  const data = cheerio.load(html)
  const info = data('.table-striped').children('tbody').children('tr')
  return info.map((i, element) => {
    const result = element.children
      .filter(element => element.name === 'td')
      .map(({ children }) => children)
      .reduce((acc, curr) => [...acc, ...curr], [])
      .reduce((acc, curr) => {
        if (curr.name === 'a') {
          const [aTag] = curr.children
          return [
            ...acc,
            aTag.data
          ]
        }
        if ('data' in curr && curr.data.trim() !== '') {
          return [
            ...acc,
            curr.data
          ]
        }

        return acc

      }, [])

    // Want each entry in array
    // So I they can be processed as a single unit
    return [result]
  }).toArray()
}