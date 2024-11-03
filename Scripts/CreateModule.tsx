/* eslint-disable no-console */
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const isRemove = process.env.REMOVE_MODULE === 'true'

const moduleName = process.argv[2]
const actionType = process.argv[3]

if (!moduleName) {
  console.error(
    'Por favor, forneça um nome para o módulo: npm run create:module <moduleName>'
  )
  process.exit(1)
}

const moduleNameUpperCase =
  moduleName.charAt(0).toUpperCase() + moduleName.slice(1).toLowerCase()

const baseDir = join(__dirname, '..', 'src', 'Modules', moduleNameUpperCase)

const defaultRoutesPath = join(
  __dirname,
  '..',
  'src',
  'Modules',
  '_Core',
  'Routes',
  'DefaultRoutes.ts'
)

const configModelsPath = join(__dirname, '..', 'config', 'models.ts')

const structure = {
  Controller: ['Controller.txt'],
  Services: ['Service.txt'],
  Repository: ['Repository.txt'],
  Routes: ['Routes.txt'],
  Models: ['Model.txt']
}

const updateDefaultRoutes = () => {
  const importStatement = `import ${moduleNameUpperCase}Router from '../../${moduleNameUpperCase}/Routes/${moduleNameUpperCase}Routes.js'\n`
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

const updateConfigModels = () => {
  const modelImport = `import ${moduleNameUpperCase} from '../src/Modules/${moduleNameUpperCase}/Models/${moduleNameUpperCase}Model.js'\n`

  if (!existsSync(configModelsPath)) {
    const initialContent = `${modelImport}\nexport const models = [ ${moduleNameUpperCase} ]`
    writeFileSync(configModelsPath, initialContent, 'utf-8')
    console.log(`Arquivo models.ts criado e ${moduleNameUpperCase} adicionado.`)
  } else {
    const content = readFileSync(configModelsPath, 'utf-8')

    const updatedContent = `${modelImport}\n${content.replace(
      /export\s+const\s+models\s+=\s+\[(.*?)\]/s,
      (match, p1) =>
        `export const models = [${p1 ? `${p1}, ` : ''}${moduleNameUpperCase}]`
    )}`

    writeFileSync(configModelsPath, updatedContent, 'utf-8')
    console.log(`Model ${moduleNameUpperCase} adicionado ao models.ts.`)
  }
}

const createStructure = () => {
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

      const fileName =
        file
          .replace('.txt', '')
          .replace(
            /(Controller|Service|Repository|Routes|Model|Types)/,
            `${moduleNameUpperCase}$&`
          ) + '.ts'
      const filePath = join(folderPath, fileName)

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
  updateConfigModels()
}

const undoCreateModule = () => {
  if (!existsSync(baseDir)) {
    console.error(`O módulo "${moduleNameUpperCase}" não existe.`)
    return
  }

  rmSync(baseDir, { recursive: true, force: true })
  console.log(`Módulo "${moduleNameUpperCase}" removido.`)

  if (existsSync(defaultRoutesPath)) {
    let content = readFileSync(defaultRoutesPath, 'utf-8')
    const importStatement = new RegExp(
      `import\\s+${moduleNameUpperCase}Router\\s+from\\s+'\\.\\.\\/\\.\\.\\/${moduleNameUpperCase}\\/Routes\\/${moduleNameUpperCase}Routes\\.js'\\n`,
      'g'
    )
    const useStatement = new RegExp(
      `defaultRoutes\\.use\\('/${moduleName.toLowerCase()}',\\s+${moduleNameUpperCase}Router\\)\\n`,
      'g'
    )
    content = content.replace(importStatement, '').replace(useStatement, '')
    writeFileSync(defaultRoutesPath, content, 'utf-8')
    console.log(`Rota removida do defaultRoutes.ts.`)
  }

  if (existsSync(configModelsPath)) {
    let content = readFileSync(configModelsPath, 'utf-8')
    const modelImport = new RegExp(
      `import\\s+${moduleNameUpperCase}\\s+from\\s+'\\.\\.\\/src\\/Modules\\/${moduleNameUpperCase}\\/Models\\/${moduleNameUpperCase}Model\\.js'\\n`,
      'g'
    )
    const modelArrayEntry = new RegExp(
      `\\b${moduleNameUpperCase}\\b\\s*,?|,?\\s*\\b${moduleNameUpperCase}\\b`,
      'g'
    )
    content = content.replace(modelImport, '').replace(modelArrayEntry, '')
    writeFileSync(configModelsPath, content.trim(), 'utf-8')
    console.log(`Model ${moduleNameUpperCase} removido do models.ts.`)
  }
}

if (isRemove) {
  undoCreateModule()
} else {
  createStructure()
}

try {
  execSync(
    'eslint config/models.ts src/Modules/_Core/Routes/DefaultRoutes.ts --fix',
    { stdio: 'inherit' }
  )
  console.log('Lint aplicado com sucesso!')
} catch (error) {
  console.error('Erro ao aplicar o lint:', error)
}

console.log(
  `Ação ${actionType === 'undo' ? 'desfeita' : 'realizada'} para o módulo ${moduleNameUpperCase}.`
)
