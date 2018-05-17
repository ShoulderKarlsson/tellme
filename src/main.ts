import program from 'commander'
import * as plugins from './plugins'
import {Plugin} from './entities'

const main = () => {
  attachPlugins(plugins, program)
  parseProgram(program)

  // If no arguments are passed, display help as some sort of default
  //
  // TODO: Maybe this is supported by commander?
  if (process.argv.length === 2) program.outputHelp()
}


/**
 * Attaches all plugins to the program
 * @param {Array} plugins list of all plugins
 * @param {Commander} program The commander instance 
 */
const attachPlugins = (plugins: Array<Plugin>, program) => {
  plugins.forEach(({ description, resolver, commands }) =>
    program.option(`${commands.short}, ${commands.long}`, description, resolver)
  )
}

const parseProgram = program => program
  .version('1.0')
  .parse(process.argv)


main()
