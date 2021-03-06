## SOCIAL NETWORK

Monorepo-project for training high-load cases and tricks.

### Stack:
1. Frontend: React, Mobx
2. Backend: Node.js (Nest), Docker, TypeORM (for migration-creation and raw sql-queries only)
3. Database: MySQL 5.7

### Get started: (local development)
1. Create .env file in project's root folder, fill that like .env.example
2. Install dependencies 
```bash
npm ci
```
3. Start database
```bash
npm run database:start
```
4. Start server. Migrations will be created automatically.
```bash
npm run server:dev
```
5. Start client
```bash
npm run client:dev
```

### Get started: (Docker)
1. Create .env file in project's root folder, fill that like .env.example
2. Build docker containers.
```bash
docker-compose build
```
3. Start docker containers
```bash
docker-compose up
```