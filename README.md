# LightChat Backend

LightChat é um projeto que visa facilitar o atendimento de pequenos e grandes negócios. O projeto é totalmente baseado no modelo de "Conversa de Utilidade", onde o cliente toma a iniciativa de entrar em contato com o estabelecimento. Com essa abordagem, a plataforma pode operar sem necessariamente gerar custos operacionais relacionados ao licenciamento da API oficial do WhatsApp.

![Status: Early Development](https://img.shields.io/badge/Status-Early_Development-blue)
![Fase: Criando Estrutura](https://img.shields.io/badge/Fase-Criando_Estrutura-green)
![Progresso: Front-End](https://img.shields.io/badge/Progresso-Finalizando_Alterações-yellow)

- Aguardando aprovação da API pela Meta para implementar o login empresarial. 

---




## O que já foi implementado

### Scripts (Helpers)
- **create:module <moduleName>**: Cria automaticamente a estrutura de pastas e arquivos para um novo módulo:
  - Cria (**Controller**, **Service**, **Repository**, **Routes**, **Model**) com os nomes formatados no padrão do projeto.
  - Preenche os arquivos apartir dos templates que podem ser facilmente alterados.
  - Adiciona automaticamente a rota do módulo no arquivo de rotas padrão `defaultRoutes.ts`. 
  - Importa automaticamente o model do módulo no arquivo padrão de models `models.ts`.
  - Faz o Linting dos arquivos afetados.
    
- **remove:module**: Remove um módulo criado com o script.
  - Remove a estrutura de pastas.
  - Remove a rota do arquivo de rotas padrão.
  - Remove o model do arquivo de models padrão.
  - Faz o Linting dos arquivos afetados. 

### Funcionalidades de Base (_Core)
- **Router**: Configuração central de rotas da aplicação.
- **Auth Middleware**: Middleware para autenticação de usuários:
  - Captura o token da requisição.
  - Decifra e autentica o usuário no Supabase.
  - Insere dados básicos do usuário em todas as requisições para uso posterior.
  - Verifica se o usuário já existe no banco de dados do LightChat. Se já existir, complementa a requisição com dados adicionais (como ID). Caso contrário, cria o usuário.

### Repositórios e Logs
- **Classe baseRepository**: Classe base para operações de CRUD, responsável por realizar inserções, atualizações, buscas e exclusões no banco de dados:
  - A classe inclui funções para verificar se a inserção foi bem-sucedida.
  - Se a operação for bem-sucedida, a classe insere um registro na tabela de logs, permitindo rastrear as ações dos usuários.
  - O sistema de logs permite filtrar os erros ou sucessos por usuário, facilitando a análise de atividades na aplicação.
    
### Enum Utilitário
- **BaseEnum**: Classe base para facilitar a criação de Enums:
  - **`typeEnum()`**: Retorna os valores do enum para uso geral.
  - **`sequelizeEnum()`**: Gera o tipo `ENUM` para uso no model do sequelize.

### Diagrama da arquitetura do banco (Early)
![image](https://github.com/user-attachments/assets/df712346-9e66-425e-a3ed-65a4e75f0fc7)

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o backend.
- **Express.js**: Framework para criação de rotas e gestão de servidores.
- **Typescript**: Para tipagem e maior segurança no desenvolvimento.
- **Supabase**: Backend-as-a-Service utilizado para autenticação e gerenciamento de usuários.
- **ESLint**: Ferramenta para garantir a qualidade do código.


Contribuições e sugestões são bem-vindas!
