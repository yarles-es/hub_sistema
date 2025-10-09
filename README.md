# hub_sistema

Base de aplicação **completa (frontend + backend)** para **academias de bairro**, com foco em **controle de acesso**, **gestão simples de mensalidades** e **biometria**.  
Integra-se às catracas/placas **LiteNet2** da **Toletus** via **LiteNet2Commands**, liberando entrada conforme regras de **adimplência** e **status do aluno**.

> O projeto já é funcional de ponta a ponta e segue em evolução com novas funcionalidades.

> **Limitação atual:** o sistema é projetado para operar **uma única catraca LiteNet2 por instância**, de forma simultânea.  
> Suporte a múltiplas catracas **não está disponível** nesta versão.

## 🎯 Finalidade

- **Controle de Acesso:** valida se o aluno está **ativo** e **adimplente** antes de liberar a catraca.
- **Mensalidades:** controle básico de planos e status (em dia, em atraso, vencido).
- **Eventos de Acesso:** registro de entradas/saídas (autorizadas ou negadas) com motivo.
- **Biometria:** cadastro/gestão de biometria por aluno.
- **Extensível:** arquitetura preparada para evoluir (relatórios, automações, etc.).

---

## 🧩 Escopo Atual

- Integração com **LiteNet2Commands** (envio de comandos e leitura de eventos).
- Domínio essencial: **Aluno**, **Plano/Mensalidade**, **Evento de Acesso**, **Biometria**.
- Regra mínima de autorização: **entrada/saída permitida apenas se `ativo` + `mensalidade em dia`**.
- Estrutura organizada para evolução de **API/serviços** e **interface** (frontend).

> **Status:** aplicação funcional com frontend e backend no mesmo repositório. Novas features estão em desenvolvimento.

---

## 🗺️ Público-alvo

- Academias de bairro que precisam de um controle simples e confiável.
- Desenvolvedores que desejam customizar uma base já integrada ao **LiteNet2/Toletus**.

---

## 📦 Instalação e configuração — API da catraca (Hub)

> Requisitos: **.NET SDK 9** instalado (`dotnet --info` deve mostrar versão 9.x).

### 1) Entrar na pasta da API

cd hub/src/Toletus.Hub.API/

### 2) Configurar IP e porta

Edite **ambos** os arquivos `appsettings.Development.json` e `appsettings.json` e ajuste o IP da máquina onde a API vai rodar (interface local) e a porta:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Hub": {
    "BindIp": "192.168.4.5",
    "Port": 5110
  }
}
```

**Observações**

- `BindIp` deve ser o **IP fixo** da máquina/servidor onde a API executará.
- Mantenha os dois arquivos sincronizados (`.Development` e o padrão) conforme o ambiente.
- Uso da porta 5110 como padrão da api, se possivel não alterar.

### 3) Restaurar dependências (opcional)

dotnet restore

### 4) Rodar a API (modo desenvolvimento)

dotnet run

A API iniciará e ficará acessível em:

http://{BindIp}:{Port}

# Ex.: http://192.168.4.5:5110

### 7) Documentação da API Toletus (Hub)

Após iniciar a API, acesse a interface de documentação (Scalar) em:
**http://localhost:5110/scalar/**

Se preferir ir direto para a rota de exemplo citada:
**http://localhost:5110/scalar/#tag/webhook/post/Webhook/SetEndpoint**

> Nessa página você encontra **todas as rotas disponíveis** para integração com os equipamentos **Toletus**.

---

## 🧩 Identificação de catracas/placas LiteNet2

Para que o **backend** se comunique com a **API Hub**, é necessário ter uma **catraca/placa LiteNet2** conectada à rede.

**Recomendações:**

- Defina um **IP fixo** para a LiteNet2 no roteador/modem (reserva DHCP ou IP estático) para padronizar as configurações.
- Após iniciar a API da catraca, **descubra os dispositivos** pela rota GET:
  - **`http://localhost:5110/DeviceConnection/GetDevices`**
  - Você pode usar Postman, Insomnia ou `curl`:
    ```bash
    curl -X GET http://localhost:5110/DeviceConnection/GetDevices
    ```

**Exemplo de resposta:**

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 1,
      "name": "LiteNet2 #1",
      "ip": "192.168.4.37",
      "port": 7878,
      "type": 1,
      "connected": false
    }
  ]
}
```

## **O que guardar para o backend:**

- `id`, `ip`, `port` e `type` — serão usados na configuração do backend.
- `connected: true` indica que já existe uma conexão ativa entre o equipamento e a API.

> **Nota:** este cadastro manual será substituído futuramente por um fluxo de configuração direto no aplicativo.

## 🚀 Backend — Instalação e execução

### Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Node.js ≥ 20** e **npm**

---

### 1) Entrar na pasta do backend

```bash
cd backend
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Subir o container docker (banco de dados)

```bash
docker compose up -d
```

### 4) Configurar variáveis de ambiente

Crie um arquivo .env (baseie-se em .env.example) com os valores abaixo:

```bash
# App
PORT=3000

# Banco de dados (ajuste se necessário)
DATABASE_URL="postgresql://admin:mypassword@localhost:5432/academia_nova_meta"

# Auth
JWT_SECRET="ACADEMIA_SECRET"

# Integração Catraca (Hub Toletus)
CATRACA_BASE_URL="http://localhost:5110/"
CATRACA_WEBHOOK_URL="http://localhost:3000/api/catraca/webhook"

# Dispositivo LiteNet2 (dados obtidos na etapa de identificação)
ID_CATRACA="41"
IP_CATRACA="192.168.4.37"
PORTA_CATRACA="7878"
TYPE_CATRACA="1"          # padrão LiteNet2
NETWORK_NAME_CATRACA="eth0"   # default para conexões cabeadas
```

> **Dica:** confirme que o DATABASE_URL aponta para o Postgres do Docker que você subiu no passo 3.

### 5) Preparar o banco (migrations + generate + seed)

```bash
npx prisma migrate deploy && npx prisma generate && npx prisma db seed
```

Após esse passo, o banco estará criado e um usuário administrador padrão também:

- **usuário:** `admin@exemple.com`
- **Senha:** `admin123`

  > Recomenda-se alterar o email e a senha após o primeiro login.

### 6) Iniciar o backend (dev)

```bash
npm run dev
```

A API iniciará em:

```arduino
http://localhost:3000
```

### 📝 Observações

- Certifique-se de que o **Hub Toletus** esteja em execução e acessível em `CATRACA_BASE_URL`.
- Garanta que a catraca **LiteNet2** esteja configurada com **IP fixo** e que os valores de `ID_CATRACA`, `IP_CATRACA`, `PORTA_CATRACA` e `TYPE_CATRACA` correspondam ao dispositivo identificado anteriormente.

## 💻 Frontend — Instalação e execução

### Pré-requisitos

- **Node.js** instalado (recomendado: ≥ 20)
- Backend em execução (ver seção do backend)

---

### 1) Entrar na pasta do frontend

```bash
cd frontend
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Iniciar o frontend (dev)

Antes, confirme que o backend está rodando.

```bash
npm run dev
```

A aplicação subirá na porta 3001 e ficará acessível em:

```bash
http://localhost:3001/erp-academia
```

Ao acessar a URL acima, você será direcionado inicialmente para a tela de login.

### 🔎 Modo demonstração (sem catraca)

É **possível executar o projeto sem a catraca instalada** caso o objetivo seja apenas **visualizar** a aplicação.

**Como fazer:**

1. Suba **apenas o backend** (banco via Docker + API) e o **frontend** normalmente.
2. No arquivo `.env` do backend, preencha os parâmetros da catraca com **valores fictícios**, por exemplo:
   ```bash
   ID_CATRACA="1"
   IP_CATRACA="127.0.0.1"
   PORTA_CATRACA="7878"
   TYPE_CATRACA="1"
   NETWORK_NAME_CATRACA="eth0"
   ```
3. **Importante:** sempre que você alterar os parâmetros da catraca no `.env`, rode novamente as seeders para sincronizar os dados:

```bash
npx prisma db seed
```

> Nesse modo, a interface e os fluxos do sistema funcionam, mas as operações de hardware (liberação/leitura da catraca) não serão executadas (pode acontecer alguns erros no log do backend, mas não vão interferir nas outras funcionalidades).

---

## 🙏 Agradecimentos

Agradecemos à **equipe da Actuar / Toletus** pelo suporte técnico e pela disponibilidade em compartilhar conhecimento sobre a plataforma **LiteNet2** e a biblioteca **LiteNet2Commands**. O envolvimento e o feedback foram fundamentais para a integração estável entre o hardware e o software deste projeto.

## ✅ Conclusão

O **hub_sistema** entrega um fluxo ponta a ponta para academias de bairro: cadastro/gestão de alunos, controle de mensalidades, registro de eventos de acesso e integração com a catraca **LiteNet2** via **API Hub**.  
Nesta versão, o sistema foi projetado para operar **uma única catraca por instância**, priorizando simplicidade e confiabilidade.  
Para testes e demonstrações, também é possível executar o projeto **sem a catraca** utilizando valores fictícios (modo demonstração).

Contribuições, sugestões e correções são bem-vindas via **Issues** e **Pull Requests**.
