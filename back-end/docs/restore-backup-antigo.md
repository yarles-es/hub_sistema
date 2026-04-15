# Restore de Backup Antigo

Este arquivo descreve o processo correto para restaurar um backup antigo e aplicar as migrations atuais do projeto em cima dele.

## Objetivo

Use este fluxo quando existir um backup antigo do banco e for preciso:

- restaurar os dados antigos;
- trazer o schema para o estado atual do projeto;
- aplicar as migrations pendentes com segurança.

## O que já existe no projeto

O projeto já possui dois caminhos diferentes para restore:

- Script CLI: `npm run restore:backup`
  - restaura o backup;
  - recria o schema `public`;
  - executa `npx prisma migrate deploy` ao final.
- Rota HTTP: `POST /backup/restore`
  - restaura o backup enviado;
  - nao executa migrations automaticamente.

Para backup antigo que precisa receber as migrations atuais, o fluxo recomendado e o script CLI.

## Pre-requisitos

Antes do restore, confirme:

- o arquivo de backup esta em `.sql` ou `.sql.gz`;
- o Postgres de destino esta acessivel;
- o `.env` possui `DATABASE_URL` configurada;
- se quiser restaurar em outro banco, defina `DATABASE_RESTORE_URL`;
- os binarios `psql` e `gzip` estao disponiveis no ambiente.

Observacao:

- o script usa `DATABASE_RESTORE_URL || DATABASE_URL` como banco de destino;
- se `DATABASE_RESTORE_URL` estiver definida, o restore vai para ela, nao para a `DATABASE_URL`.

## Comportamento importante do restore

O restore atual chama `restorePostgresFromFile(..., { dropAndRecreatePublic: true })`.

Na pratica isso significa:

- o schema `public` atual sera apagado;
- todas as tabelas atuais desse banco serao removidas antes do restore;
- o banco de destino precisa ser tratado como descartavel ou preparado para isso.

Nao rode esse processo em um banco com dados que precisem ser preservados.

## Fluxo recomendado

### 1. Subir ou preparar o banco de destino

Se for usar o banco local do projeto:

```bash
docker compose up -d postgres
```

### 2. Configurar o `.env`

Cenarios comuns:

- restaurar no mesmo banco usado pela aplicacao:
  - basta `DATABASE_URL`;
- restaurar em banco separado para validacao:
  - mantenha `DATABASE_URL` da aplicacao;
  - defina `DATABASE_RESTORE_URL` apontando para o banco temporario.

## 3. Escolher o arquivo de backup

Voce pode:

- colocar o arquivo em `backups/` e deixar o script escolher o mais recente;
- ou informar o caminho manualmente.

Formatos suportados hoje:

- `.sql`
- `.sql.gz`

Formatos nao suportados pelo script atual:

- `.dump`
- `.backup`

## 4. Executar o restore com migrations

Se o backup ja estiver em `backups/` e for o mais recente:

```bash
npm run restore:backup
```

Se quiser informar o arquivo explicitamente:

```bash
npm run restore:backup -- ./backups/meu_backup.sql.gz
```

O script executa esta sequencia:

1. resolve o arquivo do backup;
2. apaga e recria o schema `public`;
3. restaura o conteudo do backup;
4. roda `npx prisma migrate deploy`;
5. finaliza.

## 5. Validar depois do restore

Depois do processo, vale conferir:

```bash
npx prisma migrate status
```

E, se quiser inspecionar os dados:

```bash
npx prisma studio
```

## Quando usar a rota HTTP

A rota autenticada `POST /backup/restore` deve ser usada quando a necessidade for apenas restaurar o arquivo enviado.

Importante:

- ela nao roda `prisma migrate deploy`;
- se o backup for antigo, sera necessario aplicar as migrations manualmente depois.

Nesse caso, o passo adicional seria:

```bash
npx prisma migrate deploy
```

## Caso de atencao com backup muito antigo

O fluxo automatico com `prisma migrate deploy` funciona melhor quando o backup veio da mesma linha de evolucao do projeto e possui historico coerente na tabela `_prisma_migrations`.

Se o backup for anterior ao uso de Prisma, ou vier de uma estrutura muito diferente:

- o restore pode subir os dados;
- mas o `migrate deploy` pode falhar por conflito de tabelas/colunas ja existentes.

Nesses casos, o recomendado e:

1. restaurar primeiro em um banco temporario;
2. verificar se existe a tabela `_prisma_migrations`;
3. avaliar se precisa baselinar o banco antes com `prisma migrate resolve`;
4. so depois repetir o processo no banco definitivo.

## Resumo pratico

Para backup antigo com aplicacao de migrations, use:

```bash
npm run restore:backup -- ./caminho/do/backup.sql.gz
```

Se usar a rota `/backup/restore`, lembre que ela restaura, mas nao migra.
