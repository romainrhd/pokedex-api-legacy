# API Pokedex

This project is an API to storage pokemon you catches from all generations.

## Technologies
- Node.js v18
- AdonisJS
- MySQL
- Docker

## Installation
In the first time, you need to create your `.env` file :
```bash
cp .env.example .env
```
Install the node modules :
```bash
npm i
```
Launch docker stack for databases. I use two databases : one for development environment and one for testing environment.
```bash
docker compose up -d
```
Run the migration with seeding :
```
node ace migration:run --seed
```
Run your server :
```bash
node ace serve -w
```

## Run tests
Adonisjs use Japa for tests. To run tests, just launch this command :
```bash
node ace test
```