
/**
 * Main type describing the required properties for a plugin
 */
export type Plugin = {
  description: string
  commands: {
    long: string
    short: string
  }
  resolver: () => any
}