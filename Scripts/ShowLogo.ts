import figlet from 'figlet'

const showLogo = {
  run: async () => {
    const chalk = (await import('chalk')).default

    const generateLogo = (text: string): string => {
      return figlet.textSync(text, {
        font: 'ANSI Regular'
      })
    }

    console.clear()

    const lightLogo = generateLogo('Light').split('\n')

    const chatLogo = generateLogo('Chat').split('\n')

    const combinedLogo = lightLogo
      .map((line, index) => chalk.cyan(line) + chalk.red(chatLogo[index] || ''))
      .join('\n')

    console.info(
      combinedLogo,
      chalk.hex('#FF0000').bold('Modo Desenvolvimento')
    )

    console.warn(chalk.bold.yellow('Desenvolvido por Lucão do Código\n'))

    console.log('Servidor rodando na porta', chalk.bold.bgRed('3000'), '\n')

    console.log(
      'Utilize',
      chalk.bold.bgGreen('npm run create:module <nomeModulo>'),
      'para criar um módulo.\n'
    )
  }
}

export default showLogo
