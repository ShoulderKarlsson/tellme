import colors from 'colors'

export const weekPlugin = {
  description: 'Display week current weeknumber with additional information',
  command: {
    long: '--week',
    short: '-w'
  },
  resolver: () => {
    console.log('Hello')
  }
}