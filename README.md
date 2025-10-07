# hub_sistema

Base de aplicação **completa (frontend + backend)** para **academias de bairro**, com foco em **controle de acesso**, **gestão simples de mensalidades** e **biometria**.  
Integra-se às catracas/placas **LiteNet2** da **Toletus** via **LiteNet2Commands**, liberando entrada conforme regras de **adimplência** e **status do aluno**.

> O projeto já é funcional de ponta a ponta e segue em evolução com novas funcionalidades.

---

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

## 📦 Instalação & Configuração

> **Em elaboração.**  
> Esta seção será documentada em breve (dependências, variáveis de ambiente, passos para executar backend e frontend, e configuração da integração LiteNet2).
