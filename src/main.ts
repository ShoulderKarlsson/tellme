import * as program from 'commander'
// import program, {CommanderStatic} from 'commander'
// import {plugins} from './plugins'
import {plugins} from './plugins/index'
import {Plugin} from './entities'

const main = () => {

  // If no arguments are passed, display help as some sort of default
  // TODO: Maybe this is supported by commander?
  if (process.argv.length === 2) program.outputHelp()

  attachPlugins(plugins, program)
  parseProgram(program)

}

const attachPlugins = (
  plugins: Array<Plugin>,
  program: CommanderStatic
): void => {
  plugins.forEach(({description, resolver, commands}) =>
    program.option(`${commands.short}, ${commands.long}`, description, resolver)
  )
}

const parseProgram = program => program.version('1.0').parse(process.argv)

main()
