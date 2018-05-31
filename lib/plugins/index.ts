import {weekPlugin as week} from './week'
import {networkPlugin as network} from './network'
import {leapYearPlugin as leapYear} from './leap-year'
import {redDaysPlugin as redDays} from './red-days'
import {Plugin} from '../entities'

export const plugins: Array<Plugin> = [week, network, leapYear, redDays]
