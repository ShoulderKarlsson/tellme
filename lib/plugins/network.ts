import fetch from 'isomorphic-fetch'
import chalk from 'chalk'
import {Plugin} from '../entities'

export const networkPlugin: Plugin = {
  description: 'Displays network information',
  commands: {
    long: '--network',
    short: '-n',
  },

  resolver: async () => {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok)
      return console.log(
        chalk.redBright(
          'Failed to fetch network information. Please try again.'
        )
      )

    const {ip} = await response.json()

    console.log(chalk.cyanBright(`Local IP-address: ${ip}`))
  },
}
