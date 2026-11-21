# 🎫 LOADING Service Desk

Sistema interno de **Service Desk e Gestão de Chamados** desenvolvido para centralizar o registro de solicitações técnicas, triagem por categoria/prioridade e acompanhamento do ciclo de vida até a resolução.

---

## 🚀 Tecnologias Utilizadas

### Back-end
* **[Node.js](https://nodejs.org) & [TypeScript](https://typescriptlang.org)**
* **[NestJS](https://nestjs.com)** — Framework modular para construção da API REST
* **[Prisma ORM (v6)](https://prisma.io)** — Mapeamento objeto-relacional e controle de migrations
* **[PostgreSQL](https://postgresql.org)** — Banco de dados relacional
* **Class Validator & Class Transformer** — Validação declarativa de DTOs na camada HTTP

### Front-end
* **[React](https://react.dev) & [Vite](https://vitejs.dev)** — Interface web responsiva e rápida
* **JavaScript / CSS Modular** — Componentização da dashboard, filtros por status/prioridade/categoria e modais

### Infraestrutura
* **[Docker](https://docker.com) & Docker Compose** — Conteinerização do banco de dados PostgreSQL

---

## 🏗️ Arquitetura do Projeto

O back-end foi estruturado seguindo os princípios de **Arquitetura Hexagonal (Ports & Adapters)** e **Domain-Driven Design (DDD)**, garantindo que as regras de negócio permaneçam isoladas de frameworks e bancos de dados:

```text
LOADING-Service-Desk/
├── backend/
│   ├── prisma/                  # Schema e histórico de migrations SQL
│   └── src/
│       └── ticket/
│           ├── domain/          # Entidade Ticket, Enums (Status, Priority, Category), Policies e Contrato
│           ├── application/     # Regras de orquestração (TicketService)
│           ├── infra/           # Implementação concreta (PrismaTicketRepository e Mappers)
│           └── http/            # Controllers, DTOs de entrada e Presenters de resposta
├── frontend/
│   └── src/
│       ├── components/          # Tabela, Filtros, Modais e Cards de resumo
│       ├── pages/               # Páginas principais da aplicação
│       └── services/            # Cliente HTTP integrado à API
└── docker-compose.yml           # Configuração do PostgreSQL local
```

### Destaques Técnicos
* **Máquina de Estados (*Policy*):** Transições de status controladas por política dedicada (`ABERTA` → `EM_ANDAMENTO` → `CONCLUIDA`), impedindo saltos inválidos no fluxo.
* **Inversão de Dependência:** O `TicketService` depende apenas da classe abstrata `TicketRepository`, desacoplando a lógica de negócio da tecnologia de persistência.
* **Mappers e Presenters:** Separação clara entre o modelo de banco (Prisma), a entidade de domínio (`Ticket`) e o contrato JSON exposto pela API.

---

## 📋 Domínios e Valores Aceitos

* **Status (`StatusEnum`):** `ABERTA` | `EM_ANDAMENTO` | `CONCLUIDA`
* **Prioridade (`PriorityEnum`):** `BAIXA` | `MEDIA` | `ALTA`
* **Categoria (`CategoryEnum`):** `HARDWARE` | `SOFTWARE` | `REDE` | `ACESSO` | `OUTROS`

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:
* [Node.js](https://nodejs.org) (v18 ou superior)
* [Docker](https://docker.com) e Docker Compose
* [Git](https://git-scm.com)

---

## 🛠️ Como Rodar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/MessiasTrajano/LOADING-Service-Desk
cd LOADING-Service-Desk
```

### 2. Subir o banco de dados com Docker
Na raiz do projeto, inicie o contêiner do PostgreSQL:
```bash
docker compose up -d
```

### 3. Configurar e iniciar o Back-end
Entre na pasta `backend`, instale as dependências e configure as variáveis de ambiente:
```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro de `backend/` baseado no `.env.example`:
```env
DATABASE_URL="postgresql://admin:admin123@localhost:5432/servicedesk?schema=public"
```

Aplique as migrations no banco de dados e inicie o servidor:
```bash
npx prisma migrate deploy
npm run start:dev
```
> A API estará disponível em `http://localhost:3000`.

### 4. Configurar e iniciar o Front-end
Em um novo terminal, entre na pasta `frontend`, instale as dependências e rode o servidor de desenvolvimento:
```bash
cd frontend
npm install
```

Caso necessário, configure o arquivo `.env` dentro de `frontend/` apontando para a API:
```env
VITE_API_URL="http://localhost:3000"
```

Inicie a aplicação web:
```bash
npm run dev
```
> A interface web estará disponível em `http://localhost:5173`.

---

## 📌 Endpoints Principais da API (`/ticket`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/ticket` | Cria um novo chamado (`title`, `description`, `priority`, `category`) |
| `GET` | `/ticket` | Lista todos os chamados (suporta filtros: `?status=...&priority=...&category=...`) |
| `GET` | `/ticket/:id` | Busca os detalhes de um chamado específico pelo UUID |
| `PATCH` | `/ticket/:id/title` | Atualiza o título do chamado |
| `PATCH` | `/ticket/:id/description` | Atualiza a descrição do chamado |
| `PATCH` | `/ticket/:id/priority` | Altera a prioridade (`BAIXA`, `MEDIA`, `ALTA`) |
| `PATCH` | `/ticket/:id/category` | Altera a categoria (`HARDWARE`, `SOFTWARE`, `REDE`, `ACESSO`, `OUTROS`) |
| `PATCH` | `/ticket/:id/status` | Avança o status do chamado (`ABERTA` → `EM_ANDAMENTO` → `CONCLUIDA`) |
| `DELETE` | `/ticket/:id` | Remove um chamado |

---
## 🤖 Uso de Inteligência Artificial no Desenvolvimento

Em alinhamento com as diretrizes do desafio, ferramentas de Inteligência Artificial foram utilizadas de forma estratégica e transparente ao longo do projeto como suporte de mentoria técnica, prototipação e aceleração de código:

* **Mentoria e Arquitetura:** Apoio para correçoes de possiveis erros atuais e futuros (Arquitetura Hexagonal, separação de responsabilidades entre Domínio, Aplicação e Infraestrutura, implementação de *Policies* para máquina de estados e revisão de *Clean Code*).
* **Prototipação de Interface (Figma AI):** Geração da estrutura visual inicial do dashboard, modais e componentes de listagem de chamados a partir de prompts orientados aos requisitos do sistema.
* **Assistência de Código e Integração:** Auxílio na geração de código repetitivo, adaptação do layout para componentes React/Vite, sempre passando por revisão manual, validação de build e testes locais.

## 👨‍💻 Autor

Desenvolvido por **Messias Trajano** durante o processo seletivo / projeto prático da **LOADING**.