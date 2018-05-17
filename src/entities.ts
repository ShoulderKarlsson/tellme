
export type Plugin = {
  description: string
  commands: {
    long: string
    short: string
  }
  resolver: () => any
}