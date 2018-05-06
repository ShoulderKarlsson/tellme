import program from 'commander'
import plugins from './plugins'



const main = () => {
  attachPlugins(plugins, program)
  parseProgram(program)

  // Displays help if no special arguments are given
  if (process.argv.length === 2) program.outputHelp()
}

const attachPlugins = (plugins, program) => {
  plugins.forEach(({ description, resolver, commands }) =>
    program.option(`${commands.short}, ${commands.long}`, description, resolver)
  )
}


const parseProgram = () => program
  .version('1.0')
  .parse(process.argv)


main()