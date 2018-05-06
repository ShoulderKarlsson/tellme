import fetch from 'isomorphic-fetch'
import colors from 'colors'

export const networkPlugin = {
  description: 'Displays network information',
  commands: {
    long: '--network',
    short: '-n' 
  },

  resolver: async () => {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) return console.log('Failed to fetch network information. Please try again.')

    const {ip, city} = await response.json()

    console.log('')

    // Present information about public-ip, city and countreCode.
  }
}