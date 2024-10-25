/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const moduleName = process.argv[2]

if (!moduleName) {
  console.error(
    'Por favor, forneça um nome para o módulo: npm run create:module <moduleName>'
  )
  process.exit(1)
}

const moduleNameUpperCase =
  moduleName.charAt(0).toUpperCase() + moduleName.slice(1).toLowerCase()
const baseDir = join(__dirname, '..', 'src', 'Modules', moduleNameUpperCase)

// Caminho do arquivo defaultRoutes.ts
const defaultRoutesPath = join(
  __dirname,
  '..',
  'src',
  'Modules',
  '.Core',
  'Routes',
  'DefaultRoutes.ts'
)

const structure = {
  Controller: ['Controller.txt', 'ControllerTypes.txt'],
  Services: ['Service.txt', 'ServiceTypes.txt'],
  Repository: ['Repository.txt', 'RepositoryTypes.txt'],
  Routes: ['Routes.txt', 'RoutesTypes.txt'],
  Models: ['Model.txt', 'ModelTypes.txt']
}

function updateDefaultRoutes() {
  const importStatement = `import ${moduleNameUpperCase}Router from '../../${moduleNameUpperCase}/Routes/Routes'\n`
  const useStatement = `defaultRoutes.use('/${moduleName.toLowerCase()}', ${moduleNameUpperCase}Router)\n`

  if (!existsSync(defaultRoutesPath)) {
    console.error(
      `O arquivo defaultRoutes.ts não foi encontrado em ${defaultRoutesPath}`
    )
    return
  }

  const content = readFileSync(defaultRoutesPath, 'utf-8')
  const updatedContent = `${importStatement}\n${content}\n${useStatement}`
  writeFileSync(defaultRoutesPath, updatedContent, 'utf-8')
  console.log(`Rota adicionada ao defaultRoutes.ts: ${useStatement.trim()}`)
}

function createStructure() {
  if (existsSync(baseDir)) {
    console.log(`O módulo "${moduleNameUpperCase}" já existe.`)
    return
  }

  Object.entries(structure).forEach(([folder, files]) => {
    const folderPath = join(baseDir, folder)

    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true })
      console.log(`Pasta criada: ${folderPath}`)
    }

    files.forEach(file => {
      const templatePath = join(__dirname, 'Templates', file)
      const filePath = join(folderPath, file.replace('.txt', '.ts'))

      if (existsSync(templatePath)) {
        let content = readFileSync(templatePath, 'utf-8')
        content = content.replace(/{{ModuleName}}/g, moduleNameUpperCase)

        writeFileSync(filePath, content)
        console.log(`Arquivo criado: ${filePath}`)
      } else {
        console.error(`Template não encontrado: ${templatePath}`)
      }
    })
  })

  updateDefaultRoutes()
}

createStructure()
console.log(`Módulo ${moduleNameUpperCase} criado com sucesso!`)
