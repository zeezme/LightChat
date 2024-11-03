/* eslint-disable no-console */
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
      chalk.yellow.bold('Desenvolvido por Lucão do Código')
    )

    console.log(
      'Utilize',
      chalk.bold.bgGreen('npm run create:module <nomeModulo>'),
      'para criar um módulo.\n'
    )

    console.log(
      'Utilize',
      chalk.bold.bgRed('npm run remove:module <nomeModulo>'),
      'para remover um módulo.\n'
    )
  }
}

export default showLogo
