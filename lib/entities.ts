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

export type Result = Success | Fail

export type Success = {
  type: ResultTypes.Success
  data: any
}

export type Fail = {
  type: ResultTypes.Fail
  data: any
  reason: string
  origin: string
}

export enum ResultTypes {
  Success = 'Success',
  Fail = 'Fail'
}
