import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

export const redDaysPlugin = {
  description: 'Displays information about \'red days\'',
  commands: {
    long: '--red-days',
    short: '-r',
  },

  resolver: async () => {

    console.log(' > Fetching data!')
    // const html = await fetchPage('http://www.kalender.se/helgdagar')
    //   .catch(error => {
    //     console.log(error)
    //   })

    const html = fs.readFileSync(path.join(__dirname, 'info.html'))

    console.log(' > Starting to parse HTML')
    const information = parseHtml(html)
  }
}


const fetchPage = url => fetch(url)
  .then(response => response.ok ? response : Promise.reject(response))
  .then(response => response.text())


const parseHtml = html => {
  const data = cheerio.load(html)
  // const info = data('.table-striped').children('tbody').children('tr').children('td')
  const info = data('.table-striped').children('tbody').children('tr')

  const collectDataFromTag = () => {

  }

  info.each((i, element) => {
    const tds = element.children
      .filter(element => element.name === 'td')
      .map(({ children }) => children)
      .reduce((acc, curr) => [...acc, ...curr], [])
      .reduce((acc, curr) => {
        // console.log(curr)
        if (curr.name === 'a') {
          console.log('found aTag')
          const [aTag] = curr.children
          // console.log(aTag.data)
          return [
            ...acc,
            { data: aTag.data }
          ]
        }
        if ('data' in curr && curr.data.trim() !== '') {
          console.log('found regular elemnt')
          return [
            ...acc,
            { data: curr.data }
          ]
        }

        return acc

      }, [])
    console.log(' ')
    console.log(tds)
  })



  // info.each((i, e) => {
  //   const aTag = e.children.find(tag => tag.name === 'a')
  //   if (aTag) {
  //     console.log(aTag.firstChild.data)
  //   } else {
  //     console.log(e.firstChild.data)
  //   }
  // })

}