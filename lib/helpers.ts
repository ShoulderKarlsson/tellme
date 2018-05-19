import {Result, ResultTypes, Fail, Success} from './entities'
import chalk from 'chalk'

export const success = (data): Success => ({
  type: ResultTypes.Success,
  data
})

export const fail = (reason: string, origin: string, data: any): Fail => ({
  type: ResultTypes.Fail,
  reason,
  data,
  origin
})


export const presentFailure = (data: Fail): void => {
  console.log(data.data)
  console.log(chalk.redBright(data.reason))
  console.log(chalk.magentaBright(data.origin))
}