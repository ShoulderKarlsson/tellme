import program from 'commander'
import {Plugin} from './lib/entities'
import {plugins} from './lib/plugins'

const main = () => {

  // Attaching all plugins
  plugins.forEach(({description, resolver, commands}: Plugin) =>
    program.option(`${commands.short}, ${commands.long}`, description, resolver)
  )

  // If there are no arguments passed, present help
  // TODO: Check if there is "native" support for this from commander
  if (process.argv.length === 2) program.outputHelp()

  program.version('1.0').parse(process.argv)
}

main()
