import program, {CommanderStatic} from 'commander'
import {Plugin} from './lib/entities'
import {plugins} from './lib/plugins'

const main = () => {
  // Attaching all plugins
  // plugins.forEach(({description, resolver, commands}: Plugin) =>
  //   program.option(`${commands.short}, ${commands.long}`, description, resolver)
  // )

  attachPlugins(plugins, program)

  // If there are no arguments passed, present help
  // TODO: Check if there is "native" support for this from commander
  if (process.argv.length === 2) program.outputHelp()

  program.version('1.0').parse(process.argv)
}

export const attachPlugins = (plugins: Array<Plugin>, program: CommanderStatic) => {
  const throwError = (msg: string) => { throw new Error(msg) }

  plugins.forEach((plugin: Plugin) => {
    if ('resolver' in plugin === false) throwError('resolver is a required property for a plugin')
    if ('commands' in plugin === false) throwError('commands is a required property for a plugin')
    if (!plugin.commands.long || !plugin.commands.short) throwError('Must include long and short command for plugin')

    program.option(`${plugin.commands.short}, ${plugin.commands.long}`, plugin.description, plugin.resolver)
  })
}

main()
