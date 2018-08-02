import fetch from 'isomorphic-fetch'
import chalk from 'chalk'
import {Plugin, Result, ResultTypes} from '../entities'
import {success, fail, presentFailure} from '../helpers'

export const networkPlugin: Plugin = {
  description: 'Displays network information',
  commands: {
    long: '--network',
    short: '-n'
  },

  resolver: async (): Promise<any> => {
    const result: Result = await fetch('https://ipapi.co/json/').then(
      async response => response.ok
          ? success(await response.json())
          : fail(
              'Failed to fetch network information',
              'networkPlugin',
              response
            )
    )

    if (result.type === ResultTypes.Fail) return presentFailure(result)

    console.log(chalk.cyanBright(`IP-address: ${result.data.ip}`))
  }
}
