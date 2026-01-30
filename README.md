# Rocketlog Delivery API

API de entregas de encomendas feita para estudo e pratica das skills listadas abaixo.

## Visao geral
- Cadastro de usuarios e autenticacao via JWT
- Controle de entregas com status (processing, shipped, delivered)
- Registro de logs de entrega
- Regras de acesso por papel (customer e sale)
- Validacao de dados com Zod e tratamento de erros centralizado

## Stack
- Node.js + TypeScript
- Express
- Prisma + PostgreSQL
- JWT + bcrypt
- Jest + Supertest
- Zod

## Rotas
Publicas:
- POST /users -> cria usuario
- POST /sessions -> autentica e retorna token

Protegidas (Bearer token):
- GET /deliveries -> lista entregas (role: sale)
- POST /deliveries -> cria entrega (role: sale)
- PATCH /deliveries/:id/status -> atualiza status e gera log (role: sale)
- POST /delivery-logs -> cria log manual (role: sale)
- GET /delivery-logs/:delivery_id/show -> mostra entrega e logs (role: sale, customer)

## Requisitos
- Node.js 18+ (ou compativel com tsx)
- Docker (opcional, para subir o PostgreSQL)

## Configuracao
1) Instale as dependencias
   npm install

2) Suba o banco (docker-compose)
   docker-compose up -d

3) Configure variaveis de ambiente
   - copie .env.example para .env
   - adicione:
     DATABASE_URL=postgresql://postgres:postgres@localhost:5433/rocketlog
     JWT_SECRET=sua_chave_aqui

4) Rode as migrations
   npx prisma migrate dev

5) Inicie o servidor
   npm run dev

## Testes
- npm run test:dev

Observacao: os testes usam o banco configurado em DATABASE_URL. Use uma base separada se quiser isolar os dados.

## Estrutura
- src/app.ts -> configuracao do Express
- src/routes -> rotas da API
- src/controllers -> controllers
- src/middlewares -> autenticacao, autorizacao e error handling
- src/database -> prisma client
- prisma/schema.prisma -> schema do banco

## Skills praticadas
- API REST com Express
- TypeScript
- Prisma ORM e migrations
- PostgreSQL
- Autenticacao com JWT
- Hash de senha com bcrypt
- Middlewares de autorizacao
- Validacao de entrada com Zod
- Tratamento de erros com AppError
- Testes de integracao com Jest e Supertest
- Organizacao por camadas (routes, controllers, middlewares)

## Licenca
ISC
