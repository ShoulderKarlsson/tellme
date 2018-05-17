
export type Plugin = {
  description: string
  command: {
    long: string
    short: string
  }
  resolver: () => any
}