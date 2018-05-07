import fetch from 'isomorphic-fetch'

export const redDaysPlugin = {
  description: 'Displays information about \'red days\'',
  commands: {
    long: '--red-days',
    short: '-r',
  },

  resolver: () => {
    fetch('http://www.kalender.se/helgdagar')
      .then(response => response.ok ? response : Promise.reject(response))
      .then(response => response.text())
      .then(html => {
        // Do stuff with HTML here...
      })
      .catch(error => {
        console.log(error)
        console.log('Fetching red-days error')
      })
  }
}