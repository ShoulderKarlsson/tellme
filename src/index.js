import program from 'commander'
import plugins from './plugins'



const main = () => {
  attachPlugins(plugins, program)
  parseProgram(program)


  // Displays help if no special arguments are given
  if (process.argv.length === 2) displayHelp(program)
}

const attachPlugins = (plugins, program) => {
  plugins.forEach(({ description, resolver, command }) => {
    program.option(`${command.short}, ${command.long}`, description, resolver)
  })
}

const displayHelp = program => program.outputHelp()

const parseProgram = () => program
  .version('1.0')
  .parse(process.argv)


main()