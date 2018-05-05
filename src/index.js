import program from 'commander'




const main = () => {

  generateProgram()
  

}

const generateProgram = () => program
  .version('1.0')
  .option('-w, -week', 'Returns number if week', () => {
    console.log('It is week 18')
  })
  .parse(process.argv)


main()