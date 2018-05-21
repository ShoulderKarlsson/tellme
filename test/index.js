const chai = require('chai')
const expect = chai.expect
const {attachPlugins} = require('../dist/main')
const program = require('commander')

describe('Main', () => {
  describe('Wrong Plugin Properties', () => {
    it('Should throw error when resolver is not defined', () => {
      const mockPlugins = [
        {description: 'foo', commands: {long: '', short: ''}}
      ]
      expect(() => attachPlugins(mockPlugins, program)).to.throw()
    })

    it('Should throw error if commands is not defined', () => {
      const mockPlugins = [{description: 'foo', resolver: () => {}}]
      expect(() => attachPlugins(mockPlugins, program)).to.throw()
    })

    it('Should throw error if commands.long and commands.short is not defined', () => {
      const mockPlugins = [
        {description: 'foo', resolver: () => {}, commands: {}}
      ]

      expect(() => attachPlugins(mockPlugins, program)).to.throw()
    })
  })
})
