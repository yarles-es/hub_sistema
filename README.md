# Guia de Instalação e Execução

Este repositório contém três partes principais:

- back-end: API Node.js/Express com Prisma e PostgreSQL
- front-end: Aplicação Next.js
- hub: Projetos .NET 9 (integração com dispositivos Toletus)

Siga as etapas abaixo para preparar o ambiente, instalar dependências e executar cada parte.

## Requisitos

- Docker e Docker Compose (para subir PostgreSQL rapidamente)
- Node.js 18+ e npm
- .NET SDK 9.0 (para compilar/rodar o hub)

## Configuração do Banco de Dados (PostgreSQL)

Há um `docker-compose.yml` em `back-end/docker-compose.yml` que sobe um PostgreSQL com as seguintes credenciais padrão:

- HOST: localhost
- PORT: 5432
- USER: admin
- PASSWORD: mypassword
- DB: academia_nova_meta

Para iniciar o banco via Docker:

```bash
cd back-end
docker compose up -d
```

## Variáveis de Ambiente

O back-end utiliza `DATABASE_URL`, `JWT_SECRET` e URLs para integração com a catraca. Um exemplo (usado no `ecosystem.config.js` para produção):

```bash
DATABASE_URL="postgresql://admin:mypassword@localhost:5432/academia_nova_meta"
JWT_SECRET="ACADEMIA_SECRET"
CATRACA_BASE_URL="http://localhost:5110/"
CATRACA_WEBHOOK_URL="http://localhost:3000/api/catraca/webhook"
PORT=3000
```

Crie um arquivo `.env` em `back-end/` com esses valores conforme o seu ambiente. O Prisma lê `DATABASE_URL` do `.env`.

No front-end, a base de API está atualmente apontando para `http://localhost:3000/api` (veja `front-end/api/@api.ts`). Ajuste conforme necessário.

## Instalação e Execução

### 1) Back-end (API)

1. Instalar dependências
   ```bash
   cd back-end
   npm install
   ```
2. Gerar Prisma Client, aplicar migrations e (opcional) rodar seeds
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   # opcional: npx prisma db seed
   ```
3. Executar em desenvolvimento
   ```bash
   npm run dev
   # API padrão em http://localhost:3000
   ```
4. Build e execução (produção/local)
   ```bash
   npm run build
   node build/index.js
   # ou usar PM2 conforme ecosystem.config.js
   ```

Comandos úteis do Prisma (arquivo `back-end/comandos_prisma.txt`): `migrate dev`, `migrate deploy`, `db push`, `studio`, etc.

### 2) Front-end (Next.js)

1. Instalar dependências
   ```bash
   cd front-end
   npm install
   ```
2. Rodar em desenvolvimento
   ```bash
   npm run dev
   # roda em http://localhost:3001
   ```
3. Build e start
   ```bash
   npm run build
   npm start
   # inicia em http://localhost:3001
   ```

Observação: o front-end espera a API acessível em `http://localhost:3000/api`. Ajuste `front-end/api/@api.ts` ou use variáveis de ambiente/configuração conforme sua necessidade.

### 3) Hub (.NET 9)

1. Pré-requisitos: .NET SDK 9.0 instalado
2. Compilar/rodar a API (se aplicável)
   ```bash
   cd hub/src/Toletus.Hub.API
   dotnet restore
   dotnet build
   dotnet run
   ```
3. Compilar a biblioteca principal
   ```bash
   cd hub/src/Toletus.Hub
   dotnet restore
   dotnet build
   ```

## Estrutura de Pastas

- back-end: código fonte em `src/`, Prisma em `prisma/`, build em `build/`.
- front-end: app Next.js em `front-end/app/`, componentes em `front-end/components/`.
- hub: solução .NET em `hub/Toletus.Hub.sln` com projetos em `hub/src/`.

## Solução de Problemas

- Banco não conecta: verifique `DATABASE_URL` e se o container Postgres está rodando (`docker ps`).
- Migrations/Prisma: use `npx prisma validate`, `npx prisma format`, `npx prisma studio`.
- Portas ocupadas: ajuste `PORT` do back-end e a porta do front-end (padrão 3001) nos scripts `package.json`.
- Catraca (Hub): verifique se o serviço de integração (Hub) está ativo e as URLs configuradas no back-end (`CATRACA_BASE_URL`, `CATRACA_WEBHOOK_URL`).

## Licença

Consulte arquivos específicos de cada projeto para detalhes de licença.